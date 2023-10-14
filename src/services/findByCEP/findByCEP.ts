import axios from 'axios'
import { ResponseFindByCep } from './types/responseFindByCep'

export const findByCEP = async (cepValue: string) => {
  try {
    const results: ResponseFindByCep = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVICE_VIACEP_URL}${cepValue}/json/`)
      .then((response) => response.data)

    return results
  } catch (error) {
    console.log(error)
  }
}
