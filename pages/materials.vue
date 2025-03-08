<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-2 m-2 md:m-4">
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideTableOfContents :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Material Splitter</CardTitle
        >
      </Button>
    </Card>
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideHighlighter :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Material Highlighter</CardTitle
        >
      </Button>
    </Card>
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideChartPie :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Material Analyzer</CardTitle
        >
      </Button>
    </Card>
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideWalletCards :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Material Flashcards</CardTitle
        >
      </Button>
    </Card>
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideWaypoints :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Material Mind Map</CardTitle
        >
      </Button>
    </Card>
  </div>
</template>
