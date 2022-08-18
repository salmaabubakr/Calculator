class Calculator {
    constructor(preOprTextElement,curOprTextElement) {
        this.preOprTextElement=preOprTextElement
        this.curOprTextElement=curOprTextElement
        this.clear()
    }

    clear() {
        this.curOprand=''
        this.preOprand=''
        this.operation=undefined

    }

    delete() {
        this.curOprand=this.curOprand.toString().slice(0,-1)
    }

    appendnumber(number) {
        if (number === '.' && this.curOprand.includes('.')) return
     this.curOprand= this.curOprand.toString() + number.toString()
    }

    chooseOpr(operation) {
        if (this.curOprand === '') return
        if (this.preOprand !== '') {
            this.compute()
        }
        this.operation=operation
        this.preOprand= this.curOprand
        this.curOprand=''

    }
    compute() {
        let computation
        const prev = parseFloat(this.preOprand)
        const curent = parseFloat(this.curOprand)
        if (isNaN(prev) || isNaN(curent)) return
        switch (this.operation) {
            case '+':
                computation= prev+curent
                break

            case '-':
                computation= prev-curent
                break

             case '*':
                computation= prev*curent
                break

            case '/':
                computation= prev/curent
                break

               default:
                   return 
        }
        this.curOprand=computation
        this.operation=undefined
        this.preOprand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en' , {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updatedisplay() {
      this.curOprTextElement.innerText=this.curOprand
      this.getDisplayNumber(this.curOprand)
      if (this.operation != null) {
        this.preOprTextElement.innerText= `${this.preOprand} ${this.operation}`
      } else {
          this.preOprTextElement.innerText=''
      }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const preOprTextElement = document.querySelector('[data-pre-opr]')
const curOprTextElement = document.querySelector('[data-cur-opr]')

const calculator = new Calculator (preOprTextElement,curOprTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click' ,() => {
        calculator.appendnumber(button.innerText)
        calculator.updatedisplay()
    })
}) 

operationButtons.forEach(button => {
    button.addEventListener('click' ,() => {
        calculator.chooseOpr(button.innerText)
        calculator.updatedisplay()
    })
}) 

equalsButtons.addEventListener('click' , button => {
    calculator.compute()
    calculator.updatedisplay()
})

allClearButtons.addEventListener('click' , button => {
    calculator.clear()
    calculator.updatedisplay()
})

deleteButtons.addEventListener('click' , button => {
    calculator.delete()
    calculator.updatedisplay()
})