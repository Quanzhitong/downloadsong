import { songType } from '../type/namesType'

const names = ({ name, artists, id }: songType, index: number) => {
    return {
      title: `${index + 1}. ${name} -[ ${artists[0].name} ]`,
      value: { name, id },
    }
}

export default names
  