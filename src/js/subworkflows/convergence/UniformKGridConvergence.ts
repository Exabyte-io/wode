import ConvergenceParameter, {
    type ConvergenceParameterConfig,
    type UnitContext,
} from "./ConvergenceParameter";

export default class UniformKGridConvergence extends ConvergenceParameter {
    readonly increment: string;

    readonly name = "N_k" as const;

    readonly finalValue = `${this.name} + 0` as const;

    readonly unitContext: UnitContext = {
        name: "kgrid",
        data: {
            dimensions: [`{{${this.name}}}`, `{{${this.name}}}`, `{{${this.name}}}`],
            shifts: [0, 0, 0],
        },
        isEdited: true,
        isUsingJinjaVariables: true,
    };

    constructor({ initialValue, increment }: ConvergenceParameterConfig) {
        super({ initialValue });

        this.increment = `${this.name} + ${increment || ""}`;
    }
}
