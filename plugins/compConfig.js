export default async ({ $axios, app }, inject) => {
  const config = await $axios.$get('/getConfig')
  inject('compConfig', {
    signupOpen: config.data.signupOpen, // czy zapisy są otwarte, należy także ustawić w backend
    name: config.data.compName, // nazwa turnieju
    description: config.data.description,
    logo: true, // czy użyć logo na pasku nawigacji
    showTrailer: config.data.showTrailer,
    logoFile: 'logo-150x150.png', // nazwa pliku z logo
    stage: 'final', // obecny etap, qualify = kwalifikacje(grupy), final = finał(drabinka)
    bgUseFile: true, // TODO: plik jako tło strony
    bgFilePc: 'bg6-pc.jpg', // TODO: tło strony na duży ekran
    bgFileMobile: 'bg6-mobile.jpg', // TODO: tło strony na mały ekran
    bgColor: '#FFFFFF' // TODO: kolor tła, gdy nie używasz pliku
  })
}
