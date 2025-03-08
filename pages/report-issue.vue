<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();
const issueTypes = [
  {
    id: "bug",
    label: "Bug Report",
    description: "Report a software bug or unexpected behavior",
    icon: "LucideBug",
  },
  {
    id: "feature",
    label: "Feature Request",
    description: "Suggest a new feature or enhancement",
    icon: "LucideLightbulb",
  },
  {
    id: "security",
    label: "Security Issue",
    description: "Report a security vulnerability",
    icon: "LucideShieldAlert",
  },
  {
    id: "performance",
    label: "Performance Issue",
    description: "Report performance problems or slowdowns",
    icon: "LucideGauge",
  },
  {
    id: "documentation",
    label: "Documentation Issue",
    description: "Report issues with documentation",
    icon: "LucideFileText",
  },
  {
    id: "other",
    label: "Other",
    description: "Other types of issues",
    icon: "LucideHelpCircle",
  },
];

const severityLevels = [
  { id: "critical", label: "Critical", color: "destructive" },
  { id: "high", label: "High", color: "orange" },
  { id: "medium", label: "Medium", color: "yellow" },
  { id: "low", label: "Low", color: "blue" },
];

const form = ref({
  title: "",
  type: "",
  severity: "",
  description: "",
  stepsToReproduce: "",
  expectedBehavior: "",
  actualBehavior: "",
  systemInfo: {
    browser: "",
    os: "",
    screenResolution: "",
  },
  attachments: [],
});

const isSubmitting = ref(false);
const showSuccessDialog = ref(false);

const handleSubmit = async () => {
  // Functionality will be added later
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  showSuccessDialog.value = true;
  isSubmitting.value = false;
};
</script>

<template>
  <div class="container mx-auto py-8 px-4 max-w-4xl">
    <div class="space-y-6">
      <!-- Header Section -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold tracking-tight">Report an Issue</h1>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          Help us improve by reporting any issues you encounter. Please provide
          as much detail as possible.
        </p>
      </div>

      <Card class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Issue Type Selection -->
          <div class="grid gap-6">
            <Label class="text-lg font-semibold">Issue Type</Label>
            <RadioGroup
              v-model="form.type"
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div
                v-for="type in issueTypes"
                :key="type.id"
                class="relative flex cursor-pointer rounded-lg border p-4 focus:outline-none hover:border-primary"
              >
                <RadioGroupItem :value="type.id" class="sr-only" />
                <div class="flex w-full items-center justify-between">
                  <div class="flex items-center">
                    <div class="text-sm">
                      <RadioGroupLabel
                        class="font-medium flex items-center gap-2"
                      >
                        <component :is="type.icon" class="h-5 w-5" />
                        {{ type.label }}
                      </RadioGroupLabel>
                      <RadioGroupDescription class="text-muted-foreground">
                        {{ type.description }}
                      </RadioGroupDescription>
                    </div>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <!-- Title & Severity -->
          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-2">
              <Label for="title">Issue Title</Label>
              <Input
                id="title"
                v-model="form.title"
                placeholder="Brief description of the issue"
              />
            </div>
            <div class="space-y-2">
              <Label>Severity Level</Label>
              <Select v-model="form.severity">
                <SelectTrigger>
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="level in severityLevels"
                    :key="level.id"
                    :value="level.id"
                  >
                    <div class="flex items-center gap-2">
                      <Badge :variant="level.color">{{ level.label }}</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Description Fields -->
          <div class="space-y-6">
            <div class="space-y-2">
              <Label for="description">Detailed Description</Label>
              <Textarea
                id="description"
                v-model="form.description"
                placeholder="Provide a detailed description of the issue"
                :rows="5"
              />
            </div>

            <div class="space-y-2">
              <Label for="steps">Steps to Reproduce</Label>
              <Textarea
                id="steps"
                v-model="form.stepsToReproduce"
                placeholder="List the steps to reproduce this issue"
                :rows="4"
              />
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="expected">Expected Behavior</Label>
                <Textarea
                  id="expected"
                  v-model="form.expectedBehavior"
                  placeholder="What did you expect to happen?"
                  :rows="3"
                />
              </div>
              <div class="space-y-2">
                <Label for="actual">Actual Behavior</Label>
                <Textarea
                  id="actual"
                  v-model="form.actualBehavior"
                  placeholder="What actually happened?"
                  :rows="3"
                />
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div class="space-y-4">
            <Label class="text-lg font-semibold">System Information</Label>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="space-y-2">
                <Label for="browser">Browser</Label>
                <Input
                  id="browser"
                  v-model="form.systemInfo.browser"
                  placeholder="e.g. Chrome 91.0"
                />
              </div>
              <div class="space-y-2">
                <Label for="os">Operating System</Label>
                <Input
                  id="os"
                  v-model="form.systemInfo.os"
                  placeholder="e.g. Windows 10"
                />
              </div>
              <div class="space-y-2">
                <Label for="resolution">Screen Resolution</Label>
                <Input
                  id="resolution"
                  v-model="form.systemInfo.screenResolution"
                  placeholder="e.g. 1920x1080"
                />
              </div>
            </div>
          </div>

          <!-- File Attachments -->
          <div class="space-y-4">
            <Label class="text-lg font-semibold">Attachments</Label>
            <div
              class="flex justify-center rounded-lg border border-dashed p-12"
            >
              <div class="text-center">
                <LucideUpload class="mx-auto h-12 w-12 text-muted-foreground" />
                <div class="mt-4 flex text-sm leading-6 text-muted-foreground">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      multiple
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs leading-5 text-muted-foreground">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end gap-4">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit" :disabled="isSubmitting">
              <LucideLoader2
                v-if="isSubmitting"
                class="mr-2 h-4 w-4 animate-spin"
              />
              {{ isSubmitting ? "Submitting..." : "Submit Report" }}
            </Button>
          </div>
        </form>
      </Card>
    </div>

    <!-- Success Dialog -->
    <Dialog :open="showSuccessDialog" @update:open="showSuccessDialog = false">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Submitted Successfully</DialogTitle>
          <DialogDescription>
            Thank you for your report. Our team will review it and take
            appropriate action.
          </DialogDescription>
        </DialogHeader>
        <div class="flex justify-end">
          <Button @click="showSuccessDialog = false">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 4rem);
}
</style>
