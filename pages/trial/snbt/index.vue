<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-2 m-2 md:m-4">
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideFlag :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Tryout TWK</CardTitle
        >
      </Button>
    </Card>
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideBrain :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Tryout TIU</CardTitle
        >
      </Button>
    </Card>
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideDrama :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Tryout TKP</CardTitle
        >
      </Button>
    </Card>
    <Card
      class="flex w-full flex-col p-6 md:p-8 gap-2 items-center justify-center bg-blue-700 text-white"
    >
      <LucideBriefcaseBusiness :size="102" />
      <Button>
        <CardTitle class="font-serif text-lg md:text-xl font-bold"
          >Tryout SKB</CardTitle
        >
      </Button>
    </Card>
  </div>
</template>
