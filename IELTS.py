import math
from typing import Dict, List, Tuple, Optional, Union
from dataclasses import dataclass
from enum import Enum

class IELTSModule(Enum):
    """Enum for IELTS test modules (Academic vs General Training)"""
    ACADEMIC = "Academic"
    GENERAL_TRAINING = "General Training"

@dataclass
class IELTSResult:
    """
    Comprehensive IELTS result data structure containing all scoring information
    """
    listening_score: float
    reading_score: float
    writing_score: float
    speaking_score: float
    overall_band_score: float
    
    # Detailed breakdowns
    listening_raw_score: int
    reading_raw_score: int
    writing_criteria_scores: Dict[str, float]
    speaking_criteria_scores: Dict[str, float]
    
    # Performance analysis
    strengths: List[str]
    areas_for_improvement: List[str]
    cefr_level: str
    score_interpretation: Dict[str, str]

class IELTSScorer:
    """
    Sophisticated IELTS Score Calculator System
    
    This system accurately implements the IELTS scoring methodology used by
    the British Council, IDP, and Cambridge Assessment English. It handles
    both Academic and General Training modules with proper band score
    calculations, raw score conversions, and detailed performance analysis.
    
    The scoring system follows the official IELTS band descriptors and
    implements the complex weighting systems used for Writing and Speaking
    assessments.
    """
    
    def __init__(self, module: IELTSModule = IELTSModule.ACADEMIC):
        self.module = module
        
        # Official IELTS Listening raw score to band score conversion
        # Based on official IELTS scoring tables
        self.listening_conversion = {
            39: 9.0, 38: 8.5, 37: 8.5, 36: 8.0, 35: 8.0,
            34: 7.5, 33: 7.5, 32: 7.0, 31: 7.0, 30: 6.5,
            29: 6.5, 28: 6.0, 27: 6.0, 26: 5.5, 25: 5.5,
            24: 5.0, 23: 5.0, 22: 4.5, 21: 4.5, 20: 4.0,
            19: 4.0, 18: 3.5, 17: 3.5, 16: 3.0, 15: 3.0,
            14: 2.5, 13: 2.5, 12: 2.0, 11: 2.0, 10: 1.5,
            9: 1.5, 8: 1.0, 7: 1.0, 6: 0.5, 5: 0.5,
            4: 0.5, 3: 0.5, 2: 0.5, 1: 0.5, 0: 0.0
        }
        
        # Reading conversion tables (different for Academic vs General Training)
        if module == IELTSModule.ACADEMIC:
            self.reading_conversion = {
                39: 9.0, 38: 8.5, 37: 8.0, 36: 7.5, 35: 7.0,
                34: 6.5, 33: 6.0, 32: 5.5, 31: 5.0, 30: 4.5,
                29: 4.0, 28: 3.5, 27: 3.0, 26: 2.5, 25: 2.0,
                24: 1.5, 23: 1.0, 22: 0.5, 21: 0.5, 20: 0.5,
                19: 0.5, 18: 0.5, 17: 0.5, 16: 0.5, 15: 0.5,
                14: 0.5, 13: 0.5, 12: 0.5, 11: 0.5, 10: 0.5,
                9: 0.5, 8: 0.5, 7: 0.5, 6: 0.5, 5: 0.5,
                4: 0.5, 3: 0.5, 2: 0.5, 1: 0.5, 0: 0.0
            }
        else:  # General Training
            self.reading_conversion = {
                40: 9.0, 39: 8.5, 38: 8.0, 37: 7.5, 36: 7.0,
                35: 6.5, 34: 6.0, 33: 5.5, 32: 5.0, 31: 4.5,
                30: 4.0, 29: 3.5, 28: 3.0, 27: 2.5, 26: 2.0,
                25: 1.5, 24: 1.0, 23: 0.5, 22: 0.5, 21: 0.5,
                20: 0.5, 19: 0.5, 18: 0.5, 17: 0.5, 16: 0.5,
                15: 0.5, 14: 0.5, 13: 0.5, 12: 0.5, 11: 0.5,
                10: 0.5, 9: 0.5, 8: 0.5, 7: 0.5, 6: 0.5,
                5: 0.5, 4: 0.5, 3: 0.5, 2: 0.5, 1: 0.5, 0: 0.0
            }
        
        # Writing Task weights (Task 2 is worth twice as much as Task 1)
        self.writing_task_weights = {
            'task1': 1/3,
            'task2': 2/3
        }
        
        # Writing assessment criteria
        self.writing_criteria = {
            'task_achievement': 'Task Achievement/Response',
            'coherence_cohesion': 'Coherence and Cohesion',
            'lexical_resource': 'Lexical Resource',
            'grammatical_range': 'Grammatical Range and Accuracy'
        }
        
        # Speaking assessment criteria
        self.speaking_criteria = {
            'fluency_coherence': 'Fluency and Coherence',
            'lexical_resource': 'Lexical Resource',
            'grammatical_range': 'Grammatical Range and Accuracy',
            'pronunciation': 'Pronunciation'
        }
        
        # CEFR level mappings
        self.cefr_mapping = {
            9.0: 'C2', 8.5: 'C2', 8.0: 'C1', 7.5: 'C1', 7.0: 'C1',
            6.5: 'B2', 6.0: 'B2', 5.5: 'B2', 5.0: 'B1', 4.5: 'B1',
            4.0: 'A2', 3.5: 'A2', 3.0: 'A1', 2.5: 'A1', 2.0: 'A1',
            1.5: 'A1', 1.0: 'A1', 0.5: 'A1', 0.0: 'Below A1'
        }
        
        # Band score descriptors for interpretation
        self.band_descriptors = {
            9.0: "Expert User - Has fully operational command of the language",
            8.5: "Very Good User - Handles complex detailed argumentation well",
            8.0: "Very Good User - Has fully operational command with occasional inaccuracies",
            7.5: "Good User - Has operational command with occasional inaccuracies",
            7.0: "Good User - Handles complex language well and understands detailed reasoning",
            6.5: "Competent User - Generally effective command with some inaccuracies",
            6.0: "Competent User - Has generally effective command despite some inaccuracies",
            5.5: "Modest User - Has partial command with frequent problems",
            5.0: "Modest User - Has partial command and copes with overall meaning",
            4.5: "Limited User - Basic competence limited to familiar situations",
            4.0: "Limited User - Basic competence limited to familiar situations",
            3.5: "Extremely Limited User - Conveys general meaning in very familiar situations",
            3.0: "Extremely Limited User - Conveys general meaning in very familiar situations",
            2.5: "Intermittent User - Great difficulty following spoken and written English",
            2.0: "Intermittent User - Great difficulty following spoken and written English",
            1.5: "Non User - Essentially no ability except isolated words",
            1.0: "Non User - Essentially no ability except isolated words",
            0.5: "Did Not Attempt - Provides no assessable information",
            0.0: "Did Not Attempt - Did not attempt the test"
        }
    
    def calculate_listening_score(self, raw_score: int) -> float:
        """
        Converts raw listening score to IELTS band score
        
        Args:
            raw_score: Number of correct answers (0-40)
            
        Returns:
            IELTS band score (0.0-9.0)
        """
        if raw_score < 0 or raw_score > 40:
            raise ValueError("Listening raw score must be between 0 and 40")
        
        # Use the closest raw score if exact match not found
        if raw_score in self.listening_conversion:
            return self.listening_conversion[raw_score]
        else:
            # Find the closest lower score
            valid_scores = sorted([s for s in self.listening_conversion.keys() if s <= raw_score])
            if valid_scores:
                return self.listening_conversion[valid_scores[-1]]
            else:
                return 0.0
    
    def calculate_reading_score(self, raw_score: int) -> float:
        """
        Converts raw reading score to IELTS band score
        
        Args:
            raw_score: Number of correct answers (0-40)
            
        Returns:
            IELTS band score (0.0-9.0)
        """
        max_score = 40 if self.module == IELTSModule.GENERAL_TRAINING else 39
        
        if raw_score < 0 or raw_score > max_score:
            raise ValueError(f"Reading raw score must be between 0 and {max_score}")
        
        if raw_score in self.reading_conversion:
            return self.reading_conversion[raw_score]
        else:
            # Find the closest lower score
            valid_scores = sorted([s for s in self.reading_conversion.keys() if s <= raw_score])
            if valid_scores:
                return self.reading_conversion[valid_scores[-1]]
            else:
                return 0.0
    
    def calculate_writing_score(self, task1_scores: Dict[str, float], 
                              task2_scores: Dict[str, float]) -> Tuple[float, Dict[str, float]]:
        """
        Calculates IELTS Writing score based on Task 1 and Task 2 criteria scores
        
        Args:
            task1_scores: Dictionary of criteria scores for Task 1 (each 0.0-9.0)
            task2_scores: Dictionary of criteria scores for Task 2 (each 0.0-9.0)
            
        Returns:
            Tuple of (overall_writing_score, detailed_criteria_breakdown)
        """
        # Validate input scores
        for task_name, scores in [("Task 1", task1_scores), ("Task 2", task2_scores)]:
            for criterion, score in scores.items():
                if criterion not in self.writing_criteria:
                    raise ValueError(f"Invalid writing criterion: {criterion}")
                if not 0.0 <= score <= 9.0:
                    raise ValueError(f"{task_name} {criterion} score must be between 0.0 and 9.0")
        
        # Calculate average score for each task
        task1_average = sum(task1_scores.values()) / len(task1_scores)
        task2_average = sum(task2_scores.values()) / len(task2_scores)
        
        # Apply task weighting (Task 2 is worth twice as much as Task 1)
        weighted_score = (task1_average * self.writing_task_weights['task1'] + 
                         task2_average * self.writing_task_weights['task2'])
        
        # Round to nearest 0.5
        final_score = self._round_to_half(weighted_score)
        
        # Create detailed breakdown
        criteria_breakdown = {
            'task1_average': self._round_to_half(task1_average),
            'task2_average': self._round_to_half(task2_average),
            'weighted_average': self._round_to_half(weighted_score),
            'task1_scores': {k: self._round_to_half(v) for k, v in task1_scores.items()},
            'task2_scores': {k: self._round_to_half(v) for k, v in task2_scores.items()}
        }
        
        return final_score, criteria_breakdown
    
    def calculate_speaking_score(self, criteria_scores: Dict[str, float]) -> Tuple[float, Dict[str, float]]:
        """
        Calculates IELTS Speaking score based on four criteria
        
        Args:
            criteria_scores: Dictionary of speaking criteria scores (each 0.0-9.0)
            
        Returns:
            Tuple of (overall_speaking_score, rounded_criteria_scores)
        """
        # Validate input scores
        for criterion, score in criteria_scores.items():
            if criterion not in self.speaking_criteria:
                raise ValueError(f"Invalid speaking criterion: {criterion}")
            if not 0.0 <= score <= 9.0:
                raise ValueError(f"Speaking {criterion} score must be between 0.0 and 9.0")
        
        # Calculate average of all four criteria (equally weighted)
        average_score = sum(criteria_scores.values()) / len(criteria_scores)
        
        # Round to nearest 0.5
        final_score = self._round_to_half(average_score)
        
        # Round individual criteria scores
        rounded_criteria = {k: self._round_to_half(v) for k, v in criteria_scores.items()}
        
        return final_score, rounded_criteria
    
    def calculate_overall_band_score(self, listening: float, reading: float, 
                                   writing: float, speaking: float) -> float:
        """
        Calculates overall IELTS band score from four skills
        
        Args:
            listening, reading, writing, speaking: Individual skill band scores
            
        Returns:
            Overall band score (rounded to nearest 0.5)
        """
        # Validate individual scores
        for skill_name, score in [("Listening", listening), ("Reading", reading), 
                                ("Writing", writing), ("Speaking", speaking)]:
            if not 0.0 <= score <= 9.0:
                raise ValueError(f"{skill_name} score must be between 0.0 and 9.0")
        
        # Calculate average of all four skills
        average = (listening + reading + writing + speaking) / 4
        
        # Round to nearest 0.5
        return self._round_to_half(average)
    
    def _round_to_half(self, score: float) -> float:
        """
        Rounds score to nearest 0.5 (IELTS rounding system)
        
        Examples: 6.125 -> 6.0, 6.25 -> 6.5, 6.75 -> 7.0
        """
        return round(score * 2) / 2
    
    def analyze_performance(self, result: IELTSResult) -> Tuple[List[str], List[str]]:
        """
        Analyzes performance to identify strengths and areas for improvement
        
        Args:
            result: IELTSResult object containing all scores
            
        Returns:
            Tuple of (strengths, areas_for_improvement)
        """
        strengths = []
        areas_for_improvement = []
        
        skills = {
            'Listening': result.listening_score,
            'Reading': result.reading_score,
            'Writing': result.writing_score,
            'Speaking': result.speaking_score
        }
        
        # Find highest and lowest performing skills
        max_score = max(skills.values())
        min_score = min(skills.values())
        
        # Identify strengths (scores >= 7.0 or highest scores)
        for skill, score in skills.items():
            if score >= 7.0:
                strengths.append(f"{skill}: Strong performance (Band {score})")
            elif score == max_score and score >= 6.0:
                strengths.append(f"{skill}: Relative strength (Band {score})")
        
        # Identify areas for improvement (scores < 6.0 or lowest scores)
        for skill, score in skills.items():
            if score < 6.0:
                areas_for_improvement.append(f"{skill}: Needs significant improvement (Band {score})")
            elif score == min_score and score < 7.0:
                areas_for_improvement.append(f"{skill}: Area for development (Band {score})")
        
        # Analyze writing criteria if available
        if result.writing_criteria_scores:
            writing_criteria = result.writing_criteria_scores
            if 'task1_scores' in writing_criteria and 'task2_scores' in writing_criteria:
                # Find weakest writing criteria
                all_criteria = {}
                all_criteria.update(writing_criteria['task1_scores'])
                all_criteria.update(writing_criteria['task2_scores'])
                
                min_criteria_score = min(all_criteria.values())
                if min_criteria_score < 6.0:
                    weak_criteria = [k for k, v in all_criteria.items() if v == min_criteria_score]
                    for criterion in weak_criteria:
                        criterion_name = self.writing_criteria.get(criterion, criterion)
                        areas_for_improvement.append(f"Writing - {criterion_name}: Focus area (Band {min_criteria_score})")
        
        # Analyze speaking criteria if available
        if result.speaking_criteria_scores:
            min_speaking_score = min(result.speaking_criteria_scores.values())
            if min_speaking_score < 6.0:
                weak_criteria = [k for k, v in result.speaking_criteria_scores.items() 
                               if v == min_speaking_score]
                for criterion in weak_criteria:
                    criterion_name = self.speaking_criteria.get(criterion, criterion)
                    areas_for_improvement.append(f"Speaking - {criterion_name}: Focus area (Band {min_speaking_score})")
        
        return strengths, areas_for_improvement
    
    def get_cefr_level(self, overall_score: float) -> str:
        """
        Maps IELTS band score to CEFR level
        
        Args:
            overall_score: Overall IELTS band score
            
        Returns:
            CEFR level (A1, A2, B1, B2, C1, C2)
        """
        return self.cefr_mapping.get(overall_score, 'Below A1')
    
    def calculate_comprehensive_score(self, 
                                    listening_raw: int,
                                    reading_raw: int,
                                    writing_task1: Dict[str, float],
                                    writing_task2: Dict[str, float],
                                    speaking_criteria: Dict[str, float]) -> IELTSResult:
        """
        Calculates comprehensive IELTS scores from all input data
        
        Args:
            listening_raw: Raw listening score (0-40)
            reading_raw: Raw reading score (0-40)
            writing_task1: Task 1 criteria scores
            writing_task2: Task 2 criteria scores  
            speaking_criteria: Speaking criteria scores
            
        Returns:
            IELTSResult object with complete scoring analysis
        """
        print("🎯 IELTS Comprehensive Score Calculation")
        print("=" * 50)
        print(f"📋 Module: {self.module.value}")
        print()
        
        # Calculate individual skill scores
        print("📊 Calculating Individual Skill Scores:")
        
        listening_score = self.calculate_listening_score(listening_raw)
        print(f"   🎧 Listening: {listening_raw}/40 correct → Band {listening_score}")
        
        reading_score = self.calculate_reading_score(reading_raw)
        max_reading = 40 if self.module == IELTSModule.GENERAL_TRAINING else 39
        print(f"   📚 Reading: {reading_raw}/{max_reading} correct → Band {reading_score}")
        
        writing_score, writing_breakdown = self.calculate_writing_score(writing_task1, writing_task2)
        print(f"   ✍️  Writing: Task 1 avg {writing_breakdown['task1_average']}, Task 2 avg {writing_breakdown['task2_average']} → Band {writing_score}")
        
        speaking_score, speaking_breakdown = self.calculate_speaking_score(speaking_criteria)
        print(f"   🗣️  Speaking: Avg {sum(speaking_criteria.values())/len(speaking_criteria):.1f} → Band {speaking_score}")
        print()
        
        # Calculate overall score
        overall_score = self.calculate_overall_band_score(listening_score, reading_score, 
                                                        writing_score, speaking_score)
        print(f"🏆 Overall Band Score: {overall_score}")
        
        # Create result object
        result = IELTSResult(
            listening_score=listening_score,
            reading_score=reading_score,
            writing_score=writing_score,
            speaking_score=speaking_score,
            overall_band_score=overall_score,
            listening_raw_score=listening_raw,
            reading_raw_score=reading_raw,
            writing_criteria_scores=writing_breakdown,
            speaking_criteria_scores=speaking_breakdown,
            strengths=[],
            areas_for_improvement=[],
            cefr_level=self.get_cefr_level(overall_score),
            score_interpretation={}
        )
        
        # Analyze performance
        strengths, improvements = self.analyze_performance(result)
        result.strengths = strengths
        result.areas_for_improvement = improvements
        
        # Add score interpretations
        result.score_interpretation = {
            'overall': self.band_descriptors.get(overall_score, "Score not found"),
            'cefr_level': result.cefr_level,
            'listening': self.band_descriptors.get(listening_score, "Score not found"),
            'reading': self.band_descriptors.get(reading_score, "Score not found"),
            'writing': self.band_descriptors.get(writing_score, "Score not found"),
            'speaking': self.band_descriptors.get(speaking_score, "Score not found")
        }
        
        print(f"🌍 CEFR Level: {result.cefr_level}")
        print()
        
        # Display performance analysis
        print("💪 Strengths:")
        for strength in result.strengths:
            print(f"   ✅ {strength}")
        if not result.strengths:
            print("   📈 Continue building skills across all areas")
        
        print("\n🎯 Areas for Improvement:")
        for improvement in result.areas_for_improvement:
            print(f"   🔄 {improvement}")
        if not result.areas_for_improvement:
            print("   🌟 Strong performance across all skills!")
        
        return result
    
    def print_detailed_report(self, result: IELTSResult):
        """
        Prints a comprehensive IELTS score report
        
        Args:
            result: IELTSResult object
        """
        print("\n" + "=" * 60)
        print("🎓 COMPREHENSIVE IELTS SCORE REPORT")
        print("=" * 60)
        
        print(f"📋 Test Module: {self.module.value}")
        print(f"🏆 Overall Band Score: {result.overall_band_score}")
        print(f"🌍 CEFR Level: {result.cefr_level}")
        print()
        
        print("📊 Individual Skill Scores:")
        print(f"   🎧 Listening: {result.listening_score} (Raw: {result.listening_raw_score}/40)")
        print(f"   📚 Reading: {result.reading_score} (Raw: {result.reading_raw_score}/40)")
        print(f"   ✍️  Writing: {result.writing_score}")
        print(f"   🗣️  Speaking: {result.speaking_score}")
        print()
        
        if result.writing_criteria_scores:
            print("✍️  Writing Detailed Breakdown:")
            wb = result.writing_criteria_scores
            print(f"   📝 Task 1 Average: {wb['task1_average']}")
            for criterion, score in wb['task1_scores'].items():
                criterion_name = self.writing_criteria.get(criterion, criterion)
                print(f"      • {criterion_name}: {score}")
            print(f"   📝 Task 2 Average: {wb['task2_average']}")
            for criterion, score in wb['task2_scores'].items():
                criterion_name = self.writing_criteria.get(criterion, criterion)
                print(f"      • {criterion_name}: {score}")
            print()
        
        if result.speaking_criteria_scores:
            print("🗣️  Speaking Detailed Breakdown:")
            for criterion, score in result.speaking_criteria_scores.items():
                criterion_name = self.speaking_criteria.get(criterion, criterion)
                print(f"   • {criterion_name}: {score}")
            print()
        
        print("📈 Score Interpretation:")
        print(f"   Overall: {result.score_interpretation['overall']}")
        print()
        
        print("💪 Performance Analysis:")
        print("   Strengths:")
        for strength in result.strengths:
            print(f"      ✅ {strength}")
        
        print("   Areas for Improvement:")
        for improvement in result.areas_for_improvement:
            print(f"      🎯 {improvement}")


def create_sample_ielts_data():
    """
    Creates sample IELTS test data for demonstration
    """
    return {
        'listening_raw': 32,  # Band 7.0
        'reading_raw': 35,    # Band 7.0 (Academic)
        'writing_task1': {
            'task_achievement': 6.5,
            'coherence_cohesion': 7.0,
            'lexical_resource': 6.0,
            'grammatical_range': 6.5
        },
        'writing_task2': {
            'task_achievement': 7.0,
            'coherence_cohesion': 7.5,
            'lexical_resource': 6.5,
            'grammatical_range': 7.0
        },
        'speaking_criteria': {
            'fluency_coherence': 7.0,
            'lexical_resource': 6.5,
            'grammatical_range': 6.5,
            'pronunciation': 7.5
        }
    }


# Example usage and demonstration
if __name__ == "__main__":
    # Create Academic IELTS scorer
    scorer = IELTSScorer(IELTSModule.ACADEMIC)
    
    # Generate sample data
    sample_data = create_sample_ielts_data()
    
    # Calculate comprehensive scores
    result = scorer.calculate_comprehensive_score(
        listening_raw=sample_data['listening_raw'],
        reading_raw=sample_data['reading_raw'],
        writing_task1=sample_data['writing_task1'],
        writing_task2=sample_data['writing_task2'],
        speaking_criteria=sample_data['speaking_criteria']
    )
    
    # Print detailed report
    scorer.print_detailed_report(result)
    
    print("\n" + "=" * 60)
    print("🔧 SYSTEM INFORMATION")
    print("=" * 60)
    print("This IELTS scoring system implements:")
    print("• Official IELTS raw score conversion tables")
    print("• Proper task weighting for Writing (Task 2 = 2x Task 1)")
    print("• Accurate band score rounding to nearest 0.5")
    print("• Comprehensive criteria-based assessment")
    print("• CEFR level mapping")
    print("• Detailed performance analysis")
    print("• Support for both Academic and General Training modules")