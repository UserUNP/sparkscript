[sparkscript](../README.md) / [Exports](../modules.md) / [codeblocks/SetVariable](../modules/codeblocks_SetVariable.md) / SetVariable

# Class: SetVariable

[codeblocks/SetVariable](../modules/codeblocks_SetVariable.md).SetVariable

## Hierarchy

- [`default`](components_Block.default.md)

  ↳ **`SetVariable`**

## Table of contents

### Constructors

- [constructor](codeblocks_SetVariable.SetVariable.md#constructor)

### Properties

- [action](codeblocks_SetVariable.SetVariable.md#action)
- [args](codeblocks_SetVariable.SetVariable.md#args)
- [type](codeblocks_SetVariable.SetVariable.md#type)
- [variable](codeblocks_SetVariable.SetVariable.md#variable)

### Methods

- [export](codeblocks_SetVariable.SetVariable.md#export)
- [from](codeblocks_SetVariable.SetVariable.md#from)

## Constructors

### constructor

• **new SetVariable**(`action`, `variable`, ...`args`)

Create a new SetVariable codeblock.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | `string` | Action to perform. |
| `variable` | [`default`](values_Variable.default.md) | Variable to set. |
| `...args` | [`default`](components_Value.default.md)[] | Arguments to pass. |

#### Overrides

[default](components_Block.default.md).[constructor](components_Block.default.md#constructor)

#### Defined in

[codeblocks/SetVariable.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/codeblocks/SetVariable.ts#L12)

## Properties

### action

• **action**: `string`

#### Inherited from

[default](components_Block.default.md).[action](components_Block.default.md#action)

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

___

### args

• **args**: [`default`](components_Value.default.md)[] = `[]`

#### Inherited from

[default](components_Block.default.md).[args](components_Block.default.md#args)

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

___

### type

• **type**: `string`

#### Inherited from

[default](components_Block.default.md).[type](components_Block.default.md#type)

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

___

### variable

• **variable**: [`default`](values_Variable.default.md)

#### Defined in

[codeblocks/SetVariable.ts:12](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/codeblocks/SetVariable.ts#L12)

## Methods

### export

▸ **export**(): [`serializedBlock`](../interfaces/components_Block.serializedBlock.md)

Export the codeblock to a JSON object.

#### Returns

[`serializedBlock`](../interfaces/components_Block.serializedBlock.md)

DiamondFire JSON-ified codeblock.

#### Inherited from

[default](components_Block.default.md).[export](components_Block.default.md#export)

#### Defined in

[components/Block.ts:28](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L28)

___

### from

▸ `Static` **from**(`raw`): [`default`](components_Block.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | [`serializedBlock`](../interfaces/components_Block.serializedBlock.md) |

#### Returns

[`default`](components_Block.default.md)

#### Inherited from

[default](components_Block.default.md).[from](components_Block.default.md#from)

#### Defined in

[components/Block.ts:11](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L11)
