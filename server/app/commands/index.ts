export interface ICommand<R> {
    execute(): R;
}

export const execute = <R>(command: ICommand<R>) => command.execute();

