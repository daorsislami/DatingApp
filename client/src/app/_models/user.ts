export interface User {
    // interfaces in TypeScript are a little bit different to interfaces in C#
    // when we use a Interface in TypeScript we can use it to specify that something is a type of something
    username: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    gender: string;
}