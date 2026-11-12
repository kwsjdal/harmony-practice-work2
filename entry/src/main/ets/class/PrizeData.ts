export default class PrizeData {
  name: string;
  probability: number;

  constructor(name: string, probability: number) {
    this.name = name;
    this.probability = probability;
  }
}
