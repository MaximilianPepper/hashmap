class hashMap {
  constructor(size = 16) {
    this.size = size;
    this.hMap = new Array(size);
  }
  hashing(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }
    return hashCode;
  }
  set(key, value) {
    let hashCode = this.hashing(key);
    // check if key exist and update value
    if (!this.hMap[hashCode]) {
      this.hMap[hashCode] = [];
    }
    for (let i = 0; i < this.hMap[hashCode].length; i++) {
      if (this.hMap[hashCode][i].key === key) {
        this.hMap[hashCode][i].value = value;
        return;
      }
    }

    this.hMap[hashCode].push({ key, value });
    // resizing
    if (this.mapLength() / this.size >= 0.75) {
      this.size *= 2;
      let temp = new Array(this.size);
      let old = this.entries();
      for (let i = 0; i < old.length; i++) {
        let index = this.hashing(old[i][0]);
        if (!temp[index]) {
          temp[index] = [];
        }
        temp[index].push({ key: old[i][0], value: old[i][1] });
      }
      this.hMap = temp;
    }
  }
  getKey(key) {
    let hashCode = this.hashing(key);
    for (let i = 0; i < this.hMap[hashCode].length; i++) {
      if (this.hMap[hashCode][i].key === key) {
        return console.log(this.hMap[hashCode][i].value);
      }
    }
    return console.log("not found");
  }
  has(key) {
    let hashCode = this.hashing(key);
    for (let i = 0; i < this.hMap[hashCode].length; i++) {
      if (this.hMap[hashCode][i].key === key) {
        return true;
      }
    }
    return false;
  }
  removeKey(key) {
    let hashCode = this.hashing(key);
    for (let i = 0; i < this.hMap[hashCode].length; i++) {
      if (this.hMap[hashCode][i].key === key) {
        this.hMap[hashCode].splice(i, 1);
        return true;
      }
    }
    return false;
  }
  mapLength() {
    let count = 0;
    for (let i = 0; i < this.hMap.length; i++) {
      if (this.hMap[i]) {
        count += this.hMap[i].length;
      }
    }
    return count;
  }
  clear() {
    this.hMap = new Array(16);
  }
  keys() {
    let result = [];
    for (let i = 0; i < this.hMap.length; i++) {
      if (this.hMap[i]) {
        for (let j = 0; j < this.hMap[i].length; j++) {
          result.push(this.hMap[i][j].key);
        }
      }
    }
    return result;
  }
  values() {
    let result = [];
    for (let i = 0; i < this.hMap.length; i++) {
      if (this.hMap[i]) {
        for (let j = 0; j < this.hMap[i].length; j++) {
          result.push(this.hMap[i][j].value);
        }
      }
    }
    return result;
  }
  entries() {
    let result = [];
    for (let i = 0; i < this.hMap.length; i++) {
      if (this.hMap[i]) {
        for (let j = 0; j < this.hMap[i].length; j++) {
          result.push([this.hMap[i][j].key, this.hMap[i][j].value]);
        }
      }
    }
    return result;
  }
}

let n = new hashMap();
n.set("Carlos", "hello");
n.set("Max", "hi");
n.set("Max", "bye");
console.log(n.entries());
console.log(n.mapLength());
