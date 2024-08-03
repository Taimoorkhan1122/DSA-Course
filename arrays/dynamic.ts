export class DynamicArray<T> implements Iterable<T> {
    private arr: T[];
    private len: number = 0;
    private capacity: number = 0;

    constructor(capacity: number) {
        this.arr = new Array<T>(capacity);
        this.capacity = capacity;
    }

    public size(): number {
        return this.len;
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public get(index: number): T {
        return this.arr[index];
    }

    public set(index: number, elem: T): void {
        if (Math.abs(index) >= this.len) throw new Error(`Index out of bounds: ${index}`);
        this.arr[index] = elem;
    }

    public clear() {
        this.arr.length = 0;
        this.len = 0;
    }
    public add(elem: T) {
        if (this.len + 1 >= this.capacity) {
            if (this.capacity === 0) this.capacity = 0;
            else this.capacity = this.capacity *= 2;

            const newArr = new Array<T>(this.capacity);

            for (let i = 0; i < this.len; i++) newArr[i] = this.arr[i];
            this.arr = newArr;
        }
        this.arr[this.len++] = elem;
    }
    public removeAt(index: number): T {
        if (index < 0 || index >= this.len)
            throw new Error(`Index out of bounds: ${index}`);
        const data: T = this.arr[index];
        const newArr = new Array<T>(this.len - 1);
        for (let i = 0, j = 0; i < this.len; i++, j++) {
            if (i === index) j--;
            else newArr[i] = this.arr[i];
        }
        this.arr = newArr;
        this.capacity = --this.len;
        return data;
    }
    public remove(obj: T): boolean {
        const index = this.indexOf(obj);
        if (index === -1) return false;
        this.removeAt(index);
        return true;
    }
    public indexOf(obj: T): number {
        for (let i = 0; i < this.len; i++) {
            if (obj === undefined) {
                if (this.arr[i] === undefined) return i;
            } else {
                if (this.arr[i] === obj) return i;
            }
        }
        return -1;
    }
    public contains(obj: T) {
        return this.indexOf(obj) !== -1;
    }

    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const arr = this.arr.slice(0, this.len);
        return {
            next(): IteratorResult<T> {
                if (index < arr.length) {
                    return { value: arr[index++], done: false };
                } else {
                    return { value: undefined as T, done: true };
                }
            },
        };
    }

    public toString(): string {
        if (this.len === 0) return "[]";
        const sb: string[] = ["["];
        for (let i = 0; i < this.len - 1; i++) sb.push(`${this.arr[i]},`);
        sb.push(`${this.arr[this.len - 1]}]`);
        return sb.join("");
    }
}

const dynArray = new DynamicArray(5);

dynArray.add("hello");
dynArray.add(1);
dynArray.add({ test: "pass" });
dynArray.add([100, "rgb", {x: 1, y: 3}]);
dynArray.add("final piece");
dynArray.add([{position: 0}]);

console.log(dynArray.get(3));
console.log(dynArray.toString());
console.log(dynArray);
dynArray.clear();
console.log(dynArray);
