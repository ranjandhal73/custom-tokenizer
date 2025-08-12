export type Token = string;

export class CustomTokenizer {
    private vocab:Record<Token, number> = {};
    private reverseVocab: Record<number, Token> = {};
    private nextId = 1;

    constructor() {
        this.addToken("<PAD>");
        this.addToken("<UNK>");
    }

    private addToken(token: Token){
        if(!(token in this.vocab)){
            this.vocab[token] = this.nextId;
            this.reverseVocab[this.nextId] = token;
            this.nextId++;
        }
        console.log("Vocab:", this.vocab + "reverse vocab:", this.reverseVocab + "NextId:", this.nextId);
    }

    tokenize(text: string): Token[]{
        return text.match(/\s+|[^\w\s]+|\w+/g) || [];
        // return text.match(/\s+|[^\w\s]+|\w+/g) || [];
    }

    learnVocab(text: string){
        const tokens = this.tokenize(text);
        console.log("Tokens", tokens)
        tokens.forEach(t => this.addToken(t));
    }

    encode(text: string): number[]{
        const tokens = this.tokenize(text);
        const unkId = this.vocab["<UNK>"]
        return tokens.map(t => (this.vocab[t] ?? unkId));
    }

    decode(ids: number[]): string{
        return ids
      .map(id => {
        if (this.reverseVocab[id]) return this.reverseVocab[id];

        // fallback: search vocab for matching id
        for (const [tok, val] of Object.entries(this.vocab)) {
          if (val === id) {
            // cache for faster future lookups
            this.reverseVocab[id] = tok;
            return tok;
          }
        }

        return "<UNK>";
      })
      .join("");
    }

    getVocab() {
        return this.vocab;
    }

    reset(){
        this.vocab = {};
        this.reverseVocab = {};
        this.nextId = 1;
        this.addToken("<PAD>");
        this.addToken("<UNK>");
    }
}