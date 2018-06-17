export class Part {

  name : string;
  certificates : Array<string>;

  constructor(data) {
    this.name = data.name;
    this.certificates = data.certificate;
  }

}
