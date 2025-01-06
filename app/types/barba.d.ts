declare module '@barba/core' {
  export interface ITransitionData {
    current: {
      container: HTMLElement;
      namespace?: string;
    };
    next: {
      container: HTMLElement;
      namespace?: string;
    };
    trigger?: HTMLElement;
  }

  export interface IBarbaPlugin {
    init(): void;
    destroy(): void;
  }

  export interface IBarbaOptions {
    root: HTMLElement;
    transitions: Array<{
      name: string;
      leave: (data: ITransitionData) => Promise<any>;
      enter: (data: ITransitionData) => Promise<any>;
    }>;
  }

  const barba: {
    init(options: IBarbaOptions): void;
    destroy(): void;
  };

  export default barba;
}
