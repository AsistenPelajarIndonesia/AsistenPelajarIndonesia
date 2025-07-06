<!-- 
  File: pages/index.vue
  Description: A beautiful, responsive page to display a list of English grammar units.
  Built with Nuxt 3, shadcn-vue, and Tailwind CSS.
-->
<template>
  <!-- Main container with a dark, modern background -->
  <div class="bg-background text-foreground min-h-screen p-4 sm:p-6 md:p-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Header Section -->
      <header class="text-center mb-8 md:mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-primary mb-2">
          English Grammar Units
        </h1>
        <p class="text-lg text-muted-foreground">
          Select a unit below to start your learning journey.
        </p>
      </header>

      <!-- 
        Responsive Grid for Units
        - 1 column on small screens
        - 2 columns on medium screens
        - 3 columns on large screens
        - 4 columns on extra-large screens
      -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        <!-- Loop over each unit using v-for -->
        <Card 
          v-for="(unit, index) in grammarUnits" 
          :key="index"
          class="flex flex-col justify-between hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
          <CardHeader>
            <CardTitle class="text-primary"><kbd>Unit {{ index + 1 }}</kbd></CardTitle>
          </CardHeader>
          <CardContent class="flex-grow">
            <p class="text-lg font-medium text-foreground">
              {{ unit }}
            </p>
          </CardContent>
          <CardFooter>
            <Button class="w-full" @click="startUnit(index + 1, unit)">
              Start Unit
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
    
    <!-- Toaster component to display notifications -->
    <Toaster />
  </div>
</template>

<script setup lang="ts">
// Import necessary components and functions from shadcn-vue
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'

// The toast function will be used to show a notification when a button is clicked.
const { toast } = useToast()

// The rephrased list of grammar units.
const grammarUnits = [
    "Describing Actions in Progress: The Present Continuous (I am doing)",
    "Routines and General Truths: The Present Simple (I do)",
    "Choosing Between Present Continuous and Simple: Part 1",
    "Choosing Between Present Continuous and Simple: Part 2",
    "Narrating Completed Past Events: The Past Simple (I did)",
    "Setting the Scene in the Past: The Past Continuous (I was doing)",
    "The Present Perfect Experience: Part 1 (I have done)",
    "The Present Perfect Experience: Part 2 (I have done)",
    "Focus on Duration: The Present Perfect Continuous (I have been doing)",
    "Action vs. Result: Present Perfect Continuous vs. Simple",
    "Inquiring about Duration: 'How long have you (been)...?'",
    "Time Markers: 'For' and 'Since'; Pinpointing Time: 'When...?' vs. 'How long...?'",
    "Connecting Past and Present: Perfect vs. Simple 1",
    "Connecting Past and Present: Perfect vs. Simple 2",
    "Events Before a Past Time: The Past Perfect (I had done)",
    "Duration Before a Past Time: The Past Perfect Continuous (I had been doing)",
    "Expressing Possession: 'Have' vs. 'Have got'",
    "Recalling Past Habits: The 'Used to (do)' Structure",
    "Scheduling the Future with Present Tenses",
    "Declaring Future Plans with 'I'm going to (do)'",
    "Predictions and Spontaneous Decisions: 'Will' and 'Shall' 1",
    "Offers, Promises, and More: 'Will' and 'Shall' 2",
    "Intention vs. Spontaneity: 'I'm going to' vs. 'I will'",
    "Future in Progress vs. Future Completion ('Will be doing' vs. 'Will have done')",
    "Future Time Clauses: 'When I do/I've done' and 'If/When'",
    "Mastering Ability: 'Can', 'Could', and the '(be) able to' form",
    "Speculating on Possibilities: 'Could (do)' and 'Could have (done)'",
    "Certainty and Impossibility: 'Must' and 'Can't'",
    "Degrees of Possibility: 'May' and 'Might' Part 1",
    "Degrees of Possibility: 'May' and 'Might' Part 2",
    "External vs. Internal Obligation: 'Have to' and 'Must'",
    "Permission and Lack of Obligation: 'Must', 'Mustn't', 'Needn't'",
    "The Art of Giving Advice with 'Should': Part 1",
    "The Art of Giving Advice with 'Should': Part 2",
    "Urgent Advice and Suggestions: 'I'd better...' & 'It's time...'",
    "Exploring the Versatility of 'Would'",
    "Polite Interactions: Requests, Offers, and Permissions with 'Can/Could/Would'",
    "Real and Unreal Conditions: 'If I do...' vs. 'If I did...'",
    "Present Hypotheticals: 'If I knew...' & 'I wish I knew...'",
    "Past Regrets: 'If I had known...' & 'I wish I had known...'",
    "The Grammar of Wishing",
    "Shifting Focus: The Passive Voice (is done / was done)",
    "Complex Passive Tenses (be done / been done / being done)",
    "Advanced Passive Applications",
    "Reporting Beliefs and Opinions Passively (He is said to...)",
    "Arranging for a Service: 'Have something done'",
    "Relaying Information: An Introduction to Reported Speech",
    "Advanced Techniques in Reported Speech",
    "The Mechanics of Asking Questions: Part 1",
    "Embedding Questions: 'Do you know where...?'",
    "The Role of Auxiliary Verbs and Short Responses",
    "Confirming Information with Question Tags",
    "Using Gerunds After Verbs (enjoy doing)",
    "Using Infinitives After Verbs (decide to...)",
    "Structuring Sentences with Verb + Object + Infinitive (I want you to...)",
    "Gerund or Infinitive? Part 1 (remember, regret)",
    "Gerund or Infinitive? Part 2 (try, need, help)",
    "Gerund or Infinitive? Part 3 (like / would like)",
    "Stating Preferences: 'Prefer' vs. 'Would Rather'",
    "Following Prepositions with Gerunds (-ing)",
    "Being Accustomed to Something: 'Be/get used to...'",
    "Verb-Preposition Patterns with '-ing' (insist on -ing)",
    "Special '-ing' Constructions ('There's no point in...', 'It's worth...')",
    "Outlining Purpose with 'To...', 'For...', and 'So that...'",
    "Pairing Adjectives with Infinitives ('to...')",
    "Adjective Patterns: Infinitive vs. Preposition + Gerund",
    "Verbs of Perception: 'See someone do' vs. 'See someone doing'",
    "Adverbial '-ing' Clauses (Feeling tired, he went to bed.)",
    "The Basics of Countable and Uncountable Nouns",
    "Advanced Concepts in Noun Countability",
    "Articles and Quantifiers with Countable Nouns",
    "Mastering the Articles: 'A/an' vs. 'The'",
    "Core Uses of the Definite Article 'The'",
    "The Article 'The' with Institutions and Places",
    "Generic vs. Specific Use of 'The'",
    "Unique and Conceptual Uses of 'The'",
    "Using 'The' with Proper Nouns: Part 1",
    "Using 'The' with Proper Nouns: Part 2",
    "The Rules of Singular and Plural",
    "Forming Noun Compounds (a bus driver)",
    "Showing Possession: '-s' vs. 'of...'",
    "Understanding Reflexive Pronouns (myself, yourself)",
    "Advanced Possession and Independent Action ('a friend of mine', 'by myself')",
    "Existential 'There' and Impersonal 'It'",
    "Quantifying with 'Some' and 'Any'",
    "Negation and Indefinite Quantities (No/none/any/nothing)",
    "Expressing Amount: 'Much, many, little, few, a lot'",
    "Group Quantifiers: 'All of', 'Most of', 'None of'",
    "Referring to Pairs: 'Both', 'Neither', 'Either'",
    "Universal Quantifiers: 'All', 'Every', 'Whole'",
    "Distinguishing 'Each' from 'Every'",
    "Defining Relative Clauses ('who/that/which')",
    "Omitting the Relative Pronoun in Defining Clauses",
    "Expanding Relative Clauses with 'Whose/Whom/Where'",
    "Adding Extra Information with Non-Defining Clauses: Part 1",
    "Adding Extra Information with Non-Defining Clauses: Part 2",
    "Reduced Relative Clauses using '-ing' and '-ed'",
    "Describing Feelings and Things: '-ing' vs. '-ed' Adjectives",
    "The Order of Adjectives and Their Use with Linking Verbs",
    "Transforming Adjectives into Adverbs ('quick' to 'quickly')",
    "Special Adjectives and Adverbs (well, fast, hard/hardly)",
    "Intensifying with 'So' and 'Such'",
    "Indicating Degree with 'Enough' and 'Too'",
    "Subtle Differences in Degree: 'Quite', 'Pretty', 'Rather', 'Fairly'",
    "Fundamentals of Comparative Adjectives",
    "Enhancing Comparative Statements (much better)",
    "Structures of Comparison ('as...as', 'than')",
    "Reaching the Highest Degree: Superlatives",
    "Standard Word Order: Subject-Verb-Object, Place, Time",
    "The Placement of Adverbs Relative to the Verb",
    "Navigating Time with 'Still', 'Any more', 'Yet', 'Already'",
    "Adding Emphasis with 'Even'",
    "Expressing Contrast: 'Although', 'In spite of', 'Despite'",
    "Planning for Possibilities with 'In case'",
    "Stating Conditions: 'Unless', 'As long as', 'Provided'",
    "Using 'As' to Link Simultaneous Actions",
    "The Crucial Difference Between 'Like' and 'As'",
    "Making Hypothetical Comparisons with 'Like' and 'As if'",
    "Marking Time Periods: 'During', 'For', 'While'",
    "Setting Deadlines: 'By', 'Until', and 'By the time...'",
    "Pinpointing Time with 'At/On/In'",
    "Punctuality and Finality: 'On time/in time', 'At the end/in the end'",
    "Mapping Positions with 'In/At/On': Part 1",
    "Mapping Positions with 'In/At/On': Part 2",
    "Mapping Positions with 'In/At/On': Part 3",
    "Direction and Location: 'To', 'At', 'In', 'Into'",
    "Extended Uses of 'In/On/At'",
    "The Multifaceted Preposition 'By'",
    "Common Noun-Preposition Pairings",
    "Common Adjective-Preposition Pairings: Part 1",
    "Common Adjective-Preposition Pairings: Part 2",
    "Key Verb-Preposition Pairs: 'To' and 'At'",
    "Key Verb-Preposition Pairs: 'About/For/Of/After'",
    "Key Verb-Preposition Pairs: 'About' and 'Of'",
    "Key Verb-Preposition Pairs: 'Of/For/From/On'",
    "Key Verb-Preposition Pairs: 'In/Into/With/To/On'",
    "Decoding Phrasal Verbs: An Introduction",
    "Directional Phrasal Verbs: 'In' and 'Out'",
    "Separable and Inseparable Phrasal Verbs with 'Out'",
    "Phrasal Verbs for States and Actions with 'On/Off': Part 1",
    "Phrasal Verbs for States and Actions with 'On/Off': Part 2",
    "Vertical Movement in Phrasal Verbs: 'Up' and 'Down'",
    "Completion and Increase with 'Up': Part 1",
    "Completion and Increase with 'Up': Part 2",
    "Movement and Return with 'Away' and 'Back'",
];

/**
 * Handles the click event for the "Start Unit" button.
 * In a real application, this would navigate the user to the specific unit's page.
 * For now, it displays a toast notification.
 * @param {number} unitNumber - The number of the unit being started.
 * @param {string} unitTitle - The title of the unit.
 */
function startUnit(unitNumber: number, unitTitle: string) {
  console.log(`Starting Unit ${unitNumber}: ${unitTitle}`);
  toast({
    title: `Preparing Unit ${unitNumber}`,
    description: `You are about to start: "${unitTitle}"`,
  });
  // Example of navigation in Nuxt 3:
  const router = useRouter();
  router.push(`/units/grammar/unit${unitNumber}`);
}
</script>

<style>
/* Optional global styles. 
  Using Tailwind utility classes is preferred, but you can add base styles here.
*/
body {
  @apply bg-background;
}
</style>
