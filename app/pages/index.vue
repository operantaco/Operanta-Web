<template>
  <div>
    <a
      :href="`#${SECTION_IDS.problem}`"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-default focus:px-4 focus:py-2"
    >{{ $t('a11y.skip') }}</a>
    <AppHeader />
    <main>
      <SectionHero />
      <SectionProblem />
      <SectionServices />
      <SectionMethod />
      <SectionAudience />
      <SectionValue />
      <SectionPlans />
      <SectionTeam />
      <SectionContact />
    </main>
    <AppFooter />
    <WhatsAppFab />
  </div>
</template>
