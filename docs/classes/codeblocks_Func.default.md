[sparkscript](../README.md) / [Exports](../modules.md) / [codeblocks/Func](../modules/codeblocks_Func.md) / default

# Class: default

[codeblocks/Func](../modules/codeblocks_Func.md).default

## Hierarchy

- [`default`](components_Block.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](codeblocks_Func.default.md#constructor)

### Properties

- [action](codeblocks_Func.default.md#action)
- [args](codeblocks_Func.default.md#args)
- [name](codeblocks_Func.default.md#name)
- [type](codeblocks_Func.default.md#type)

### Methods

- [export](codeblocks_Func.default.md#export)
- [from](codeblocks_Func.default.md#from)

## Constructors

### constructor

• **new default**(`name`, ...`args`)

Place a function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Function name. |
| `...args` | [`default`](components_Value.default.md)[] | Arguments, can be used as notes since they're not used in the function. |

#### Overrides

[default](components_Block.default.md).[constructor](components_Block.default.md#constructor)

#### Defined in

codeblocks/Func.ts:11

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

### name

• **name**: `string`

#### Defined in

codeblocks/Func.ts:11

___

### type

• **type**: `string`

#### Inherited from

[default](components_Block.default.md).[type](components_Block.default.md#type)

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

## Methods

### export

▸ **export**(): [`serializedBlock`](../interfaces/components_Block.serializedBlock.md)

Export the codeblock to a JSON object.

#### Returns

[`serializedBlock`](../interfaces/components_Block.serializedBlock.md)

DiamondFire JSON-ified codeblock.

#### Overrides

[default](components_Block.default.md).[export](components_Block.default.md#export)

#### Defined in

codeblocks/Func.ts:15

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
