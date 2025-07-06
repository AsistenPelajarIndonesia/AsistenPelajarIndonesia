<!--
  File: /pages/grammar-test.vue
  Description: An example page demonstrating the usage of the GrammarLayout component.
  This page provides the data (props) and content (slots) for the layout.
-->
<script setup lang="ts">
import { ref } from 'vue'
import GrammarLayout from '@/layouts/GrammarLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2 } from 'lucide-vue-next'

// --- Page State ---
// This reactive state controls the page's logic.
const practiceInputs = ref(['', '', '', ''])
const showResultArea = ref(false)

// --- Event Handlers ---
// These functions are called when the layout emits events.
function handleBack() {
  console.log("Navigate to previous unit")
  alert("Going back!") // Replace with router navigation, e.g., useRouter().back()
}

function handleNext() {
  console.log("Navigate to next unit")
  alert("Going next!") // Replace with router navigation, e.g., useRouter().push('/next-unit')
}

function checkAnswers() {
  // In a real app, you would have logic here to check answers.
  console.log("Checking answers:", practiceInputs.value)
  showResultArea.value = true
}
</script>

<template>
  <GrammarLayout
    test-title="Grammar In Action"
    test-description="Your interactive guide to mastering English grammar."
    unit-title="Unit 3: Present Continuous or Present Simple?"
    unit-description="Deciding between actions happening Now and actions that happen In General."
    :categories="['Tenses', 'Beginner', 'Verb Forms']"
    :show-result="showResultArea"
    @back="handleBack"
    @next="handleNext"
  >
    <!-- ======================================================================= -->
    <!-- MATERIAL SLOT CONTENT                                                   -->
    <!-- ======================================================================= -->
    <template #material>
      <Card>
        <CardHeader>
          <CardTitle>When to Use Which?</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <h3 class="font-bold">Present Continuous</h3>
              <p class="text-sm text-muted-foreground">(I am doing)</p>
              <p class="mt-2 text-sm">For actions happening now or around the time of speaking (temporary).</p>
              <ul class="mt-2 list-disc pl-5 text-sm space-y-1">
                <li>The water <span class="font-semibold text-primary">is boiling</span>.</li>
                <li>I<span class="font-semibold text-primary">'m reading</span> a really good book.</li>
              </ul>
            </div>
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <h3 class="font-bold">Present Simple</h3>
              <p class="text-sm text-muted-foreground">(I do)</p>
              <p class="mt-2 text-sm">For habits, routines, facts, and things that are generally true.</p>
               <ul class="mt-2 list-disc pl-5 text-sm space-y-1">
                <li>Water <span class="font-semibold text-primary">boils</span> at 100 degrees.</li>
                <li>I <span class="font-semibold text-primary">read</span> a lot of books.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Special Case: State Verbs</CardTitle>
        </CardHeader>
        <CardContent>
            <p class="text-sm">Some verbs describe a state, not an action. We usually use the Present Simple for these, even if we mean 'now'.</p>
            <p class="text-sm mt-2"><span class="font-semibold">Common state verbs:</span> like, want, need, know, prefer, believe, understand.</p>
            <div class="mt-4 rounded-md border-l-4 border-green-500 bg-green-50 p-3 dark:bg-green-950">
                <p class="text-sm text-green-800 dark:text-green-200">✓ I <span class="font-bold">want</span> to go home now.</p>
            </div>
            <div class="mt-2 rounded-md border-l-4 border-red-500 bg-red-50 p-3 dark:bg-red-950">
                <p class="text-sm text-red-800 dark:text-red-200">✗ <del>I am wanting to go home now.</del></p>
            </div>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- PRACTICE SLOT CONTENT                                                   -->
    <!-- ======================================================================= -->
    <template #practice>
      <Card>
        <CardHeader>
          <CardTitle>Practice: Tense Detector</CardTitle>
          <CardDescription>Read the sentence and type the correct verb form.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-6">
          <!-- Question 1 -->
          <div class="grid gap-2">
            <Label for="q1">"Listen! Somebody [sing]. (sing)"</Label>
            <div class="flex gap-2">
              <Input id="q1" v-model="practiceInputs[0]" placeholder="Type the correct form..." />
              <Button variant="outline">Check</Button>
            </div>
          </div>
          <!-- Question 2 -->
          <div class="grid gap-2">
            <Label for="q2">"I [drive] to work every day. (drive)"</Label>
             <div class="flex gap-2">
              <Input id="q2" v-model="practiceInputs[1]" placeholder="Type the correct form..." />
              <Button variant="outline">Check</Button>
            </div>
          </div>
          <!-- Question 3 -->
          <div class="grid gap-2">
            <Label for="q3">"Be quiet! The baby [sleep]. (sleep)"</Label>
             <div class="flex gap-2">
              <Input id="q3" v-model="practiceInputs[2]" placeholder="Type the correct form..." />
              <Button variant="outline">Check</Button>
            </div>
          </div>
          <!-- Question 4 -->
           <div class="grid gap-2">
            <Label for="q4">"She [speak] four languages. (speak)"</Label>
             <div class="flex gap-2">
              <Input id="q4" v-model="practiceInputs[3]" placeholder="Type the correct form..." />
              <Button variant="outline">Check</Button>
            </div>
          </div>
          <!-- Submit All Button -->
          <Button @click="checkAnswers" class="w-full">Submit All & See Results</Button>
        </CardContent>
      </Card>
    </template>
    
    <!-- ======================================================================= -->
    <!-- RESULT SLOT CONTENT                                                     -->
    <!-- ======================================================================= -->
    <template #result>
       <Alert class="border-green-500 text-green-700 dark:border-green-600 dark:text-green-300">
          <CheckCircle2 class="h-4 w-4" />
          <AlertTitle class="font-bold">Great Job!</AlertTitle>
          <AlertDescription>
            You've completed the practice session. Your results are displayed here. You got 3 out of 4 correct. Keep practicing!
          </AlertDescription>
        </Alert>
    </template>

  </GrammarLayout>
</template>
