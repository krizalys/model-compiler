import {Node}                  from "../ast/Node";
import {TypeScriptTypeDefiner} from "../language/typescript/TypeScriptTypeDefiner";

export class TypeScriptCompiler
{
    public constructor(
        private typeDefiner: TypeScriptTypeDefiner
    )
    {
    }

    public compile(node: Node, name: string): string
    {
        return node.types[0].accept(name, this.typeDefiner);
    }
}
