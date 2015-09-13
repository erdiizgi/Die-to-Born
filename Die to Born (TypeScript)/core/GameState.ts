module MCGE.Core {
    export class GameState {
        private _state: string;

        constructor(state: string) {
            this._state = state;
        }

        set state(state: string) {
            this._state = state;
        }

        get state(): string {
            return this._state;
        }
    }
} 