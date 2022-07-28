[sparkscript](../README.md) / [Exports](../modules.md) / [components/Block](../modules/components_Block.md) / default

# Class: default

[components/Block](../modules/components_Block.md).default

## Hierarchy

- **`default`**

  ↳ [`EntityAction`](codeblocks_Entity.EntityAction.md)

  ↳ [`EntityEvent`](codeblocks_Entity.EntityEvent.md)

  ↳ [`default`](codeblocks_Func.default.md)

  ↳ [`default`](codeblocks_GameAction.default.md)

  ↳ [`PlayerAction`](codeblocks_Player.PlayerAction.md)

  ↳ [`PlayerEvent`](codeblocks_Player.PlayerEvent.md)

  ↳ [`default`](codeblocks_SelectObject.default.md)

  ↳ [`SetVariable`](codeblocks_SetVariable.SetVariable.md)

## Table of contents

### Constructors

- [constructor](components_Block.default.md#constructor)

### Properties

- [action](components_Block.default.md#action)
- [args](components_Block.default.md#args)
- [type](components_Block.default.md#type)

### Methods

- [export](components_Block.default.md#export)
- [from](components_Block.default.md#from)

## Constructors

### constructor

• **new default**(`type`, `action`, `args?`)

Create a new codeblock.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | `string` | `undefined` | Type of the codeblock. |
| `action` | `string` | `undefined` | - |
| `args` | [`default`](components_Value.default.md)[] | `[]` | - |

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

## Properties

### action

• **action**: `string`

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

___

### args

• **args**: [`default`](components_Value.default.md)[] = `[]`

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

___

### type

• **type**: `string`

#### Defined in

[components/Block.ts:22](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L22)

## Methods

### export

▸ **export**(): [`serializedBlock`](../interfaces/components_Block.serializedBlock.md)

Export the codeblock to a JSON object.

#### Returns

[`serializedBlock`](../interfaces/components_Block.serializedBlock.md)

DiamondFire JSON-ified codeblock.

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

#### Defined in

[components/Block.ts:11](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Block.ts#L11)
