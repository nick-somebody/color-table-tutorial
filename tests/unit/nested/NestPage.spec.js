import { shallowMount } from '@vue/test-utils'
import NestPage from "../../../src/components/nested/NestPage.vue";

const randomCellSpy = jest.spyOn(NestPage.methods, 'randomCell')
const randomRowSpy = jest.spyOn(NestPage.methods, 'randomRow')
const randomColumnSpy = jest.spyOn(NestPage.methods, 'randomColumn')
const randomGridSpy = jest.spyOn(NestPage.methods, 'randomGrid')

describe('NestPage.vue', () => {
  const wrapperMaker = () => {
    return  shallowMount(NestPage)
  }
  
  describe('randomise', () => {
    const wrapper = wrapperMaker()

    
    beforeEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('should call randomCell when rowIdx and colIdx passed', () => {
      wrapper.vm.randomise({rowIdx: 0, colIdx: 0})
      wrapper.vm.$forceUpdate()
      expect(randomCellSpy).toHaveBeenCalled()
      expect(randomRowSpy).not.toHaveBeenCalled()
      expect(randomColumnSpy).not.toHaveBeenCalled()
      expect(randomGridSpy).not.toHaveBeenCalled()
    })
    it('should call randomRow when rowIdx passed', () => {
      wrapper.vm.randomise({rowIdx: 0})
      expect(randomCellSpy).not.toHaveBeenCalled()
      expect(randomRowSpy).toHaveBeenCalled()
      expect(randomColumnSpy).not.toHaveBeenCalled()
      expect(randomGridSpy).not.toHaveBeenCalled()
    })
    it('should call randomColumn when colIdx passed', () => {
      wrapper.vm.randomise({colIdx: 0})
      expect(randomCellSpy).not.toHaveBeenCalled()
      expect(randomRowSpy).not.toHaveBeenCalled()
      expect(randomColumnSpy).toHaveBeenCalled()
      expect(randomGridSpy).not.toHaveBeenCalled()
    })
    it('should call randomGrid when rowIdx and colIdx passed', () => {
      wrapper.vm.randomise({})
      expect(randomCellSpy).not.toHaveBeenCalled()
      expect(randomRowSpy).not.toHaveBeenCalled()
      expect(randomColumnSpy).not.toHaveBeenCalled()
      expect(randomGridSpy).toHaveBeenCalled()
    })
  })

  describe('random helpers', () => {
    let wrapper
    beforeEach(() => {
      wrapper = wrapperMaker()
      wrapper.vm.addRow()
      wrapper.vm.addRow()
      wrapper.vm.addRow()
      wrapper.vm.addCol()
      wrapper.vm.addCol()
      wrapper.vm.addCol()
    })
    const sum = (color) => {
      return color.r + color.g + color.b
    }
    it('randomCell should replace only color at colIdx and rowIdx', () => {
      const rowIdx = 1, colIdx = 1
      const orig = {...wrapper.vm.grid[rowIdx][colIdx]}
      wrapper.vm.randomCell(rowIdx, colIdx)
      const new_ = {...wrapper.vm.grid[rowIdx][colIdx]}
      expect(sum(orig)).not.toEqual(sum(new_))
    })

    it('randomRow should replace row of colors at rowIdx', () => {
      const rowIdx = 1
      const origRow = wrapper.vm.grid[rowIdx].map((cell) => {
        return {...cell}
      })
      wrapper.vm.randomRow(rowIdx)
      const newRow = wrapper.vm.grid[rowIdx].map((cell) => {
        return {...cell}
      })
      origRow.forEach((color, idx) => {
        expect(sum(color)).not.toEqual(sum(newRow[idx]))
      })
    })
    it('randomColumn should replace col of colors at colIdx', () => {
      const colIdx = 1
      const origCol = wrapper.vm.grid.map(row => {
        return {...row[colIdx]}
      })
      wrapper.vm.randomColumn(colIdx)
      const newCol = wrapper.vm.grid.map(row => {
        return {...row[colIdx]}
      })
      origCol.forEach((color, idx) => {
        expect(sum(color)).not.toEqual(sum(newCol[idx]))
      })
    })
    it('randomGrid should replace everything', () => {
      const origGrid = ([...wrapper.vm.grid]).map(row => {
        return row.map(col => ({...col}))
      })
      wrapper.vm.randomGrid()
      const newGrid = wrapper.vm.grid.map(row => {
        return row.map(col => ({...col}))
      })
      origGrid.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
          expect(sum(col)).not.toEqual(sum(newGrid[rowIdx][colIdx]))
        })
      })
    })
    it('should add row when addRow called', () => {
      const len = wrapper.vm.grid.length
      wrapper.vm.addRow()
      expect(len).toEqual(wrapper.vm.grid.length - 1)
    })
    it('should add col when addCol called', () => {
      const len = wrapper.vm.grid[0].length
      wrapper.vm.addCol()
      expect(len).toEqual(wrapper.vm.grid[0].length - 1)
    })
    it('should remove row when remRow called', () => {
      const len = wrapper.vm.grid.length
      wrapper.vm.remRow()
      expect(len).toEqual(wrapper.vm.grid.length + 1)
    })
    it('should remove col when remCol called', () => {
      const len = wrapper.vm.grid[0].length
      wrapper.vm.remCol()
      expect(len).toEqual(wrapper.vm.grid[0].length + 1)
    })
  })

  it('columns should return empty array if no rows', () => {
    const wrapper = wrapperMaker()
    wrapper.vm.remRow()
    expect(wrapper.vm.columns).toHaveLength(0)
  })
  it('columns should first row if any rows', () => {
    const wrapper = wrapperMaker()
    expect(wrapper.vm.columns).toBe(wrapper.vm.grid[0])
  })
})