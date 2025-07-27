class SitePasswordService {
  constructor() {}
}

class OptionsService {
  static version = 2
  salt
  passwordLength
  iterations
  specialChars

  #storageKeyPrefix = 'options_v'

  constructor() {
    this.loadFromStorage(OptionsService.version)
  }

  hasOptions() {
    return (
      this.salt !== undefined &&
      this.salt.length > 0 &&
      this.passwordLength !== undefined &&
      this.passwordLength > 0 &&
      this.iterations !== undefined &&
      this.iterations > 0 &&
      this.specialChars !== undefined
    )
  }

  getStorageKeyForVersion(version) {
    return `${this.#storageKeyPrefix}${version}`
  }

  loadFromStorage(version) {
    const optionsJson = localStorage.getItem(this.getStorageKeyForVersion(version))
    if (optionsJson) {
      const options = JSON.parse(optionsJson)
      this.salt = options.salt
      this.passwordLength = options.passwordLength
      this.iterations = options.iterations
      this.specialChars = options.specialChars
    }
  }

  saveToStorage() {
    const options = {
      version: OptionsService.version,
      salt: this.salt,
      passwordLength: this.passwordLength,
      iterations: this.iterations,
      specialChars: this.specialChars,
    }
    localStorage.setItem(this.getStorageKeyForVersion(options.version), JSON.stringify(options))
  }

  createRandomDefaults() {
    const cryptoService = new CryptoService()
    this.salt = cryptoService.randomHash(256)
    this.iterations = cryptoService.randomNumber(1000, 10000)
    this.passwordLength = 15
    this.specialChars = '@!?_#%.-*&$^:'
  }

  updateOptionsFormFields(formId) {
    const form = document.getElementById(formId)
    if (form) {
      form.querySelector('textarea[name="salt"]').value = this.salt
      form.querySelector('input[name="iterations"]').value = this.iterations
      form.querySelector('input[name="defaultPasswordLength"]').value = this.passwordLength
      form.querySelector('input[name="allowedSpecialChars"]').value = this.specialChars
    }
  }

  saveOptionsFromForm(formId) {
    const form = document.getElementById(formId)
    if (form) {
      let salt = form.querySelector('textarea[name="salt"]').value
      this.salt = salt.toLowerCase().replace(/[^a-f0-9]/g, '')
      this.iterations = parseInt(form.querySelector('input[name="iterations"]').value, 10)
      this.passwordLength = parseInt(
        form.querySelector('input[name="defaultPasswordLength"]').value,
        10
      )
      let specialChars = form.querySelector('input[name="allowedSpecialChars"]').value
      this.specialChars = specialChars.replace(/[\s\n\ra-zA-Z0-9]/g, '')
      this.saveToStorage()
    }
  }
}

class CryptoService {
  constructor() {}

  async generatePasswordFromForm(formId) {
    const form = document.getElementById(formId)
    if (form) {
      const domain = form.querySelector('input[name="domain"]').value
      const masterPassword = form.querySelector('input[name="masterPassword"]').value
      form.querySelector('input[name="masterPassword"]').value = ''
      const passwordSettings = {
        salt: optionsService.salt,
        iterations: optionsService.iterations,
        specialchars: optionsService.specialChars,
        passwordlength: parseInt(form.querySelector('input[name="passwordLength"]').value, 10),
        usenumbers: form.querySelector('input[name="numbers"]').checked,
        minnumbers: parseInt(form.querySelector('input[name="minNumbers"]').value, 10),
        usespecialchars: form.querySelector('input[name="specialChars"]').checked,
        minspecialchars: parseInt(form.querySelector('input[name="minSpecialChars"]').value, 10),
      }
      return await createPasswordForDomainname(domain, masterPassword, passwordSettings)
    }

    return null
  }

  randomNumber(min, max) {
    return getRandomNumber(min, max)
  }

  randomHash(length) {
    return getRandomHash(length)
  }
}
