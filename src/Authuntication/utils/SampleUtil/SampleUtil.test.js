import {add} from '.'
describe("add tests",()=>{
    beforeAll(() => {
        console.log("hello");
      })
    it("should return sum of two numbers",()=>{
        expect(add(1,2)).toBe(3);
    });
    it("should add if argument is string ",()=>{
        console.log("can I");
        expect(add("1",2)).toBe(null);
    });
    it("should add only first two numbers",()=>{
        expect(add(1,2,3)).toBe(add(1,2));
    })
    it("should add only first two numbers",()=>{
        expect('long string').toMatch('s')
        expect('string').toEqual(expect.any(String))
    })
   
    afterAll(() => {
        console.log("bye");
      })
})



