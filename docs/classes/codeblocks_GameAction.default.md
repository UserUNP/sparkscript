[sparkscript](../README.md) / [Exports](../modules.md) / [codeblocks/GameAction](../modules/codeblocks_GameAction.md) / default

# Class: default

[codeblocks/GameAction](../modules/codeblocks_GameAction.md).default

## Hierarchy

- [`default`](components_Block.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](codeblocks_GameAction.default.md#constructor)

### Properties

- [action](codeblocks_GameAction.default.md#action)
- [args](codeblocks_GameAction.default.md#args)
- [type](codeblocks_GameAction.default.md#type)

### Methods

- [export](codeblocks_GameAction.default.md#export)
- [from](codeblocks_GameAction.default.md#from)

## Constructors

### constructor

• **new default**(`action`, ...`args`)

Used to do something related to the plot and everyone playing it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | `string` | Action to perform. |
| `...args` | [`default`](components_Value.default.md)[] | Arguments to pass. |

#### Overrides

[default](components_Block.default.md).[constructor](components_Block.default.md#constructor)

#### Defined in

codeblocks/GameAction.ts:10

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
