<template>

      <Card class="p-4">
        <h1 class="text-2xl font-bold font-serif">OSN</h1>
        <Select v-model="selectedJenjang">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Pilih Jenjang" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Jenjang</SelectLabel>
              <SelectItem value="SD"> SD </SelectItem>
              <SelectItem value="SMP"> SMP </SelectItem>
              <SelectItem value="SMA"> SMA </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select v-model="selectedBidang" v-if="selectedJenjang === 'SD'">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Pilih Bidang" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pilih Bidang</SelectLabel>
              <SelectItem value="IPA"> IPA </SelectItem>
              <SelectItem value="Matematika"> Matematika </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select v-model="selectedBidang" v-if="selectedJenjang === 'SMP'">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Pilih Bidang" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pilih Bidang</SelectLabel>
              <SelectItem value="IPA"> IPA </SelectItem>
              <SelectItem value="IPS"> IPS </SelectItem>
              <SelectItem value="Matematika"> Matematika </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select v-model="selectedBidang" v-if="selectedJenjang === 'SMA'">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Pilih Bidang" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pilih Bidang</SelectLabel>
              <SelectItem value="Astronomi"> Astronomi </SelectItem>
              <SelectItem value="Biologi"> Biologi </SelectItem>
              <SelectItem value="Ekonomi"> Ekonomi </SelectItem>
              <SelectItem value="Fisika"> Fisika </SelectItem>
              <SelectItem value="Geografi"> Geografi </SelectItem>
              <SelectItem value="Informatika"> Informatika </SelectItem>
              <SelectItem value="Kebumian"> Kebumian </SelectItem>
              <SelectItem value="Matematika"> Matematika </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div v-if="selectedBidang !== ''">
          <Button>Mulai</Button>
        </div>
      </Card>
</template>