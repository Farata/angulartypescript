import {Counter} from './counter';

describe("Counter", ()=>{

  let cnt: Counter;

  beforeEach(() => cnt = new Counter()) ;

    it("should increment the counter by 1", () => {
        cnt.increment();
        expect(cnt.counter).toBe(1);
      }
    );

  it("should decrement the counter by 1", () => {
      cnt.decrement();
      expect(cnt.counter).toBe(-1);
    }
  );
});
