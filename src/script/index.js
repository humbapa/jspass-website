const optionsService = new OptionsService()
const cryptoService = new CryptoService()

addEventListener('DOMContentLoaded', () => {
  let menuButton = document.getElementById('menuButton')
  let menuMenu = document.getElementById('menuMenu')
  menuButton.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    menuMenu.classList.add('flex')
    menuMenu.classList.remove('hidden')
    document.body.addEventListener(
      'click',
      () => {
        menuMenu.classList.add('hidden')
        menuMenu.classList.remove('flex')
      },
      { once: true }
    )
  })

  let welcomeDialog = document.getElementById('welcomeDialog')
  let welcomeDialogOpenOptionsButton = document.getElementById('welcomeDialogOpenOptionsButton')
  welcomeDialogOpenOptionsButton.addEventListener('click', () => {
    welcomeDialog.close()
    optionsService.updateOptionsFormFields('optionsForm')
    optionsDialog.showModal()
  })
  if (!optionsService.hasOptions()) {
    optionsService.createRandomDefaults()
    welcomeDialog.showModal()
  }

  let optionsButton = document.getElementById('optionsButton')
  let optionsDialog = document.getElementById('optionsDialog')
  let optionsDialogCloseButton = document.getElementById('optionsDialogCloseButton')
  let optionsDialogSaveCloseButton = document.getElementById('optionsDialogSaveCloseButton')
  optionsButton.addEventListener('click', () => {
    optionsService.updateOptionsFormFields('optionsForm')
    optionsDialog.showModal()
  })
  optionsDialogCloseButton.addEventListener('click', () => {
    optionsDialog.close()
  })
  optionsDialogSaveCloseButton.addEventListener('click', (event) => {
    event.preventDefault()
    optionsService.saveOptionsFromForm('optionsForm')
    optionsDialog.close()
  })

  let generateButton = document.getElementById('generateButton')
  let passwordDialog = document.getElementById('passwordDialog')
  let passwordDialogCloseButton = document.getElementById('passwordDialogCloseButton')
  let passwordDialogCopyCloseButton = document.getElementById('passwordDialogCopyCloseButton')
  let passwordResultInput = document.getElementById('sitePassword')
  generateButton.addEventListener('click', async (event) => {
    event.preventDefault()
    const password = await cryptoService.generatePasswordFromForm('passwordForm')
    if (password) {
      passwordDialog.showModal()
      passwordResultInput.value = password
      passwordResultInput.focus()
      passwordResultInput.select()
    }
  })
  passwordDialogCloseButton.addEventListener('click', () => {
    passwordResultInput.value = ''
    passwordDialog.close()
  })
  passwordDialogCopyCloseButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(passwordResultInput.value)
    } catch (error) {
      console.error(error.message)
      passwordResultInput.focus()
      passwordResultInput.select()
      document.execCommand('copy')
    }
    passwordResultInput.value = ''
    passwordDialog.close()
  })
})
