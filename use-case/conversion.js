import { sourates } from "../constants/sorats.list";


export function convertSelectVerset({surahNumber, selectedValue}) {
    let total = 0;
    for (let sourat of sourates) {
      if (sourat.numero === surahNumber) {
        break;
      }
      total += sourat.versets;
    }
    return total + selectedValue
  }