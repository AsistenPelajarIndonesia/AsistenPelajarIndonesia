import math
import random
from typing import Dict, List, Tuple
from dataclasses import dataclass

@dataclass
class SNBTResult:
    """
    Data class to store comprehensive SNBT scoring results.
    This mimics what you'd receive from the actual SNBT system.
    """
    raw_scores: Dict[str, int]
    standardized_scores: Dict[str, float]
    percentiles: Dict[str, float]
    overall_tps_score: float
    overall_percentile: float
    performance_analysis: Dict[str, str]

class SNBTScorer:
    """
    SNBT Score Calculator - A comprehensive scoring system that mimics
    the actual Indonesian SNBT (Seleksi Nasional Berdasarkan Tes) scoring methodology.
    
    This class processes student responses and calculates scores following
    the same principles used in the real SNBT system, including statistical
    standardization and percentile ranking.
    """
    
    def __init__(self):
        # Define the structure of SNBT subtests based on current format
        # These numbers reflect the typical question distribution in actual SNBT
        self.subtest_structure = {
            'penalaran_umum': {
                'name': 'Penalaran Umum (General Reasoning)',
                'questions': 30,
                'weight': 1.0,
                'description': 'Logical thinking and pattern recognition'
            },
            'pengetahuan_kuantitatif': {
                'name': 'Pengetahuan Kuantitatif (Quantitative Knowledge)', 
                'questions': 25,
                'weight': 1.0,
                'description': 'Mathematical reasoning and problem solving'
            },
            'penalaran_matematika': {
                'name': 'Penalaran Matematika (Mathematical Reasoning)',
                'questions': 25,
                'weight': 1.0,
                'description': 'Advanced mathematical logic and analysis'
            },
            'literasi_bahasa_indonesia': {
                'name': 'Literasi Bahasa Indonesia (Indonesian Literacy)',
                'questions': 30,
                'weight': 1.0,
                'description': 'Reading comprehension and language analysis'
            },
            'literasi_bahasa_inggris': {
                'name': 'Literasi Bahasa Inggris (English Literacy)',
                'questions': 20,
                'weight': 1.0,
                'description': 'English reading comprehension and usage'
            }
        }
        
        # Statistical parameters for score standardization
        # These simulate the population statistics used in real SNBT scoring
        self.population_stats = {
            'penalaran_umum': {'mean': 15.5, 'std_dev': 4.2},
            'pengetahuan_kuantitatif': {'mean': 12.8, 'std_dev': 3.8},
            'penalaran_matematika': {'mean': 13.2, 'std_dev': 4.1},
            'literasi_bahasa_indonesia': {'mean': 18.3, 'std_dev': 3.9},
            'literasi_bahasa_inggris': {'mean': 11.7, 'std_dev': 3.5}
        }
        
        # Score ranges for standardized scores (similar to SAT-style scaling)
        self.score_range = {'min': 200, 'max': 800, 'mean': 500, 'std_dev': 100}
    
    def validate_user_data(self, user_data: Dict) -> bool:
        """
        Validates that the user data contains all required subtests with correct structure.
        This is like checking that a student has answered all sections of the test.
        """
        required_subtests = set(self.subtest_structure.keys())
        provided_subtests = set(user_data.keys())
        
        if not required_subtests.issubset(provided_subtests):
            missing = required_subtests - provided_subtests
            raise ValueError(f"Missing subtests: {missing}")
        
        # Validate each subtest has the correct number of responses
        for subtest, responses in user_data.items():
            if subtest in self.subtest_structure:
                expected_questions = self.subtest_structure[subtest]['questions']
                if len(responses) != expected_questions:
                    raise ValueError(
                        f"Subtest '{subtest}' expects {expected_questions} responses, "
                        f"but got {len(responses)}"
                    )
        
        return True
    
    def calculate_raw_scores(self, user_data: Dict) -> Dict[str, int]:
        """
        Calculates raw scores (number of correct answers) for each subtest.
        This is the first step in SNBT scoring - just counting correct answers.
        """
        raw_scores = {}
        
        for subtest, responses in user_data.items():
            if subtest in self.subtest_structure:
                # Count correct answers (True values in the response list)
                correct_count = sum(1 for response in responses if response is True)
                raw_scores[subtest] = correct_count
                
                print(f"📊 {self.subtest_structure[subtest]['name']}: "
                      f"{correct_count}/{len(responses)} correct")
        
        return raw_scores
    
    def standardize_scores(self, raw_scores: Dict[str, int]) -> Dict[str, float]:
        """
        Converts raw scores to standardized scores using statistical transformation.
        This mimics how SNBT adjusts for test difficulty and creates comparable scores.
        
        The formula used is: standardized_score = mean + (z_score * standard_deviation)
        where z_score = (raw_score - population_mean) / population_std_dev
        """
        standardized_scores = {}
        
        for subtest, raw_score in raw_scores.items():
            if subtest in self.population_stats:
                pop_mean = self.population_stats[subtest]['mean']
                pop_std = self.population_stats[subtest]['std_dev']
                
                # Calculate z-score (how many standard deviations from mean)
                z_score = (raw_score - pop_mean) / pop_std
                
                # Transform to our standard scale (200-800 with mean 500, std dev 100)
                standardized_score = self.score_range['mean'] + (z_score * self.score_range['std_dev'])
                
                # Ensure score stays within bounds
                standardized_score = max(self.score_range['min'], 
                                       min(self.score_range['max'], standardized_score))
                
                standardized_scores[subtest] = round(standardized_score, 1)
                
                print(f"🔢 {self.subtest_structure[subtest]['name']}: "
                      f"{raw_score} raw → {standardized_score:.1f} standardized")
        
        return standardized_scores
    
    def calculate_percentiles(self, standardized_scores: Dict[str, float]) -> Dict[str, float]:
        """
        Calculates percentile rankings for each subtest score.
        Percentiles tell you what percentage of test-takers you scored better than.
        """
        percentiles = {}
        
        for subtest, std_score in standardized_scores.items():
            # Convert standardized score to percentile using normal distribution
            # This assumes scores follow a normal distribution (bell curve)
            z_score = (std_score - self.score_range['mean']) / self.score_range['std_dev']
            
            # Use cumulative distribution function to get percentile
            percentile = self._normal_cdf(z_score) * 100
            percentiles[subtest] = round(percentile, 1)
            
            # Only print if it's a real subtest (not 'overall')
            if subtest in self.subtest_structure:
                print(f"📈 {self.subtest_structure[subtest]['name']}: "
                      f"{percentile:.1f}th percentile")
        
        return percentiles
    
    def _normal_cdf(self, x: float) -> float:
        """
        Approximates the cumulative distribution function of standard normal distribution.
        This is used to convert z-scores to percentiles.
        """
        # Using the error function approximation for normal CDF
        return 0.5 * (1 + math.erf(x / math.sqrt(2)))
    
    def calculate_overall_tps_score(self, standardized_scores: Dict[str, float]) -> float:
        """
        Calculates the overall TPS score by averaging all subtest scores.
        This follows the SNBT methodology of combining multiple components.
        """
        total_weighted_score = 0
        total_weight = 0
        
        for subtest, score in standardized_scores.items():
            weight = self.subtest_structure[subtest]['weight']
            total_weighted_score += score * weight
            total_weight += weight
        
        overall_score = total_weighted_score / total_weight
        return round(overall_score, 1)
    
    def analyze_performance(self, percentiles: Dict[str, float]) -> Dict[str, str]:
        """
        Provides qualitative analysis of performance in each subtest.
        This helps students understand their strengths and areas for improvement.
        """
        analysis = {}
        
        for subtest, percentile in percentiles.items():
            if percentile >= 90:
                level = "Excellent (Top 10%)"
            elif percentile >= 75:
                level = "Good (Top 25%)" 
            elif percentile >= 50:
                level = "Average (Above Median)"
            elif percentile >= 25:
                level = "Below Average (Bottom 50%)"
            else:
                level = "Needs Improvement (Bottom 25%)"
            
            analysis[subtest] = level
        
        return analysis
    
    def calculate_snbt_scores(self, user_data: Dict) -> SNBTResult:
        """
        Main function that processes user responses and calculates comprehensive SNBT scores.
        
        Expected user_data format:
        {
            'penalaran_umum': [True, False, True, ...],  # 30 boolean values
            'pengetahuan_kuantitatif': [True, False, ...],  # 25 boolean values
            'penalaran_matematika': [False, True, ...],  # 25 boolean values
            'literasi_bahasa_indonesia': [True, True, ...],  # 30 boolean values
            'literasi_bahasa_inggris': [False, True, ...]  # 20 boolean values
        }
        """
        print("🎯 Starting SNBT Score Calculation...")
        print("=" * 60)
        
        # Step 1: Validate input data
        self.validate_user_data(user_data)
        print("✅ Input data validation passed")
        print()
        
        # Step 2: Calculate raw scores
        print("📋 Calculating Raw Scores:")
        raw_scores = self.calculate_raw_scores(user_data)
        print()
        
        # Step 3: Standardize scores
        print("⚖️  Applying Statistical Standardization:")
        standardized_scores = self.standardize_scores(raw_scores)
        print()
        
        # Step 4: Calculate percentiles
        print("📊 Calculating Percentile Rankings:")
        percentiles = self.calculate_percentiles(standardized_scores)
        print()
        
        # Step 5: Calculate overall TPS score
        overall_tps_score = self.calculate_overall_tps_score(standardized_scores)
        overall_percentile = self.calculate_percentiles({'overall': overall_tps_score})['overall']
        
        print("🎖️  Overall Results:")
        print(f"   Overall TPS Score: {overall_tps_score}")
        print(f"   Overall Percentile: {overall_percentile}th percentile")
        print()
        
        # Step 6: Performance analysis
        print("📈 Performance Analysis:")
        performance_analysis = self.analyze_performance(percentiles)
        for subtest, analysis in performance_analysis.items():
            subtest_name = self.subtest_structure[subtest]['name']
            print(f"   {subtest_name}: {analysis}")
        
        return SNBTResult(
            raw_scores=raw_scores,
            standardized_scores=standardized_scores,
            percentiles=percentiles,
            overall_tps_score=overall_tps_score,
            overall_percentile=overall_percentile,
            performance_analysis=performance_analysis
        )


def create_sample_data() -> Dict:
    """
    Creates sample student response data for testing the scoring system.
    This simulates what you'd get from a student who performed reasonably well.
    """
    sample_data = {}
    
    # Create realistic sample responses for each subtest
    sample_data['penalaran_umum'] = (
        [True] * 18 + [False] * 7 + [True] * 3 + [False] * 2
    )  # 21/30 correct (70%)
    
    sample_data['pengetahuan_kuantitatif'] = (
        [True] * 15 + [False] * 6 + [True] * 2 + [False] * 2
    )  # 17/25 correct (68%)
    
    sample_data['penalaran_matematika'] = (
        [True] * 14 + [False] * 8 + [True] * 1 + [False] * 2
    )  # 15/25 correct (60%)
    
    sample_data['literasi_bahasa_indonesia'] = (
        [True] * 22 + [False] * 5 + [True] * 2 + [False] * 1
    )  # 24/30 correct (80%)
    
    sample_data['literasi_bahasa_inggris'] = (
        [True] * 12 + [False] * 6 + [True] * 1 + [False] * 1
    )  # 13/20 correct (65%)
    
    return sample_data


# Example usage and demonstration
if __name__ == "__main__":
    # Create the scorer instance
    scorer = SNBTScorer()
    
    # Generate sample student data
    print("🎓 SNBT Score Calculator Demo")
    print("=" * 60)
    print("Generating sample student responses...")
    print()
    
    student_responses = create_sample_data()
    
    # Calculate scores
    result = scorer.calculate_snbt_scores(student_responses)
    
    print("\n" + "=" * 60)
    print("🎯 FINAL SNBT SCORE REPORT")
    print("=" * 60)
    print(f"📊 Overall TPS Score: {result.overall_tps_score}/800")
    print(f"📈 Overall Percentile: {result.overall_percentile}th percentile")
    print()
    print("📋 Detailed Subtest Results:")
    for subtest in result.standardized_scores:
        name = scorer.subtest_structure[subtest]['name']
        raw = result.raw_scores[subtest]
        questions = scorer.subtest_structure[subtest]['questions']
        std_score = result.standardized_scores[subtest]
        percentile = result.percentiles[subtest]
        
        print(f"   {name}:")
        print(f"      Raw Score: {raw}/{questions} ({raw/questions*100:.1f}%)")
        print(f"      Standardized Score: {std_score}/800")
        print(f"      Percentile: {percentile}th")
        print()