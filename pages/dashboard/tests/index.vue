<template>
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 my-3 mx-3">
        <DashboardTestCard to="/custom" title="Custom Test" picture="/banners/CUSTOM-BANNER.svg">
            <LucideSlidersHorizontal class="h-4 w-4 text-muted-foreground" />
        </DashboardTestCard>
        <DashboardTestCard to="/" title="TOEFL Preparation Test" picture="https://upload.wikimedia.org/wikipedia/commons/9/9c/TOEFL_Logo.svg">
            <LucideBookOpenText class="h-4 w-4 text-muted-foreground" />
        </DashboardTestCard>
        <DashboardTestCard to="/" title="IELTS Preparation Test" picture="https://upload.wikimedia.org/wikipedia/commons/7/7f/IELTS_logo.svg">
            <LucideLayers class="h-4 w-4 text-muted-foreground" />
        </DashboardTestCard>
        <DashboardTestCard to="/" title="MBTI Personality Test" picture="/banners/MBTI-BANNER.svg">
            <LucideDrama class="h-4 w-4 text-muted-foreground" />
        </DashboardTestCard>
        <DashboardTestCard to="/" title="Learning Style Test" picture="/banners/LEARNING-STYLE-BANNER.svg">
            <LucideSwatchBook class="h-4 w-4 text-muted-foreground" />
        </DashboardTestCard>
    </div>
</template>