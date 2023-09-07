import React, { useState } from "react"
import "./App.css"

type TaxRule = {
  name: string
  value: string
}
const IncludeTaxRule: TaxRule = {
  name: "内税",
  value: "included"
}
const ExcludedTaxRule: TaxRule = {
  name: "外税",
  value: "excluded"
}
type TaxRateRule = {
  name: string
  taxRate: number
}
const ReducedTaxRate: TaxRateRule = {
  name: "軽減税率",
  taxRate: 8.0
}
const StandardTaxRate: TaxRateRule = {
  name: "標準税率",
  taxRate: 10.0
}
const App = () => {
  const [taxRule, setTaxRule] = useState<TaxRule>(IncludeTaxRule)
  const [taxRateRule, setTaxRateRule] = useState<TaxRateRule>(ReducedTaxRate)
  const [taxPrice, setTaxPrice] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  const handleChangeRadioButton = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value
    if (input === "included") {
      const tax = calculateTaxPrice(price, taxRateRule, IncludeTaxRule)
      setTaxRule(IncludeTaxRule)
      setTaxPrice(tax)
    } else if (input === "excluded") {

      const tax = calculateTaxPrice(price, taxRateRule, ExcludedTaxRule)
      setTaxRule(ExcludedTaxRule)
      setTaxPrice(tax)
    }
  }

  const handleChangeTaxRateRuleRadioButton = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value
    if (input === "standard") {
      const tax = calculateTaxPrice(price, StandardTaxRate, taxRule)
      setTaxRateRule(StandardTaxRate)
      setTaxPrice(tax)
    } else if (input === "reduced") {
      const tax = calculateTaxPrice(price, ReducedTaxRate, taxRule)
      setTaxRateRule(ReducedTaxRate)
      setTaxPrice(tax)
    }
  }
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prePrice = Number(event.target.value)
    const tax = calculateTaxPrice(prePrice,taxRateRule, taxRule)
    setTaxPrice(tax)
    setPrice(prePrice)
  }

  const calculateTaxPrice = (price: number,taxRateType:TaxRateRule, taxRuleType: TaxRule) => {
    if (taxRuleType === ExcludedTaxRule) {
      return price * (taxRateType.taxRate / 100)
    } else if (taxRuleType === IncludeTaxRule) {
      return price * (taxRateType.taxRate / (100 + taxRateType.taxRate))
    }
    return 0
  }


  return (
    <>
    <div className="title">
      <h1>インボイス攻略</h1>
    </div>
      <div className="price card">
        <label>金額</label>
        <input type="number" name="price" onChange={handleChangePrice} />
      </div>
      <div className="tax-rule card">
        <label>税規則</label>
        <div className="tax-rule-input">
          <input
            type="radio"
            name="tax_rule"
            value="included"
            checked={taxRule === IncludeTaxRule}
            onChange={handleChangeRadioButton}
          />
          <label>内税</label>
          <input
            type="radio"
            name="tax_rule"
            value="excluded"
            checked={taxRule === ExcludedTaxRule}
            onChange={handleChangeRadioButton}
          />
          <label>外税</label>
        </div>
      </div>
      <div className="tax-rate-rule card">
        <label>税区分</label>
        <div className="tax-rate-rule-input">
          <input
            type="radio"
            name="tax_rate_rule"
            value="reduced"
            checked={taxRateRule === ReducedTaxRate}
            onChange={handleChangeTaxRateRuleRadioButton}
          />
          <label>軽減税率 (8%)</label>
          <input
            type="radio"
            name="tax_rate_rule"
            value="standard"
            checked={taxRateRule === StandardTaxRate}
            onChange={handleChangeTaxRateRuleRadioButton}
          />
          <label>標準税率 (10%)</label>
        </div>
      </div>
      <div className="tax-price card">
        <label>税額: </label>
        <span>{taxPrice}</span>
      </div>
    </>
  )
}

export default App
