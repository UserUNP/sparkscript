[sparkscript](../README.md) / [Exports](../modules.md) / [codeblocks/Player](../modules/codeblocks_Player.md) / PlayerEvent

# Class: PlayerEvent

[codeblocks/Player](../modules/codeblocks_Player.md).PlayerEvent

## Hierarchy

- [`default`](components_Block.default.md)

  ↳ **`PlayerEvent`**

## Table of contents

### Constructors

- [constructor](codeblocks_Player.PlayerEvent.md#constructor)

### Properties

- [action](codeblocks_Player.PlayerEvent.md#action)
- [args](codeblocks_Player.PlayerEvent.md#args)
- [event](codeblocks_Player.PlayerEvent.md#event)
- [type](codeblocks_Player.PlayerEvent.md#type)

### Methods

- [export](codeblocks_Player.PlayerEvent.md#export)
- [from](codeblocks_Player.PlayerEvent.md#from)

## Constructors

### constructor

• **new PlayerEvent**(`event`)

When a player does something.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | Event to listen for. |

#### Overrides

[default](components_Block.default.md).[constructor](components_Block.default.md#constructor)

#### Defined in

[codeblocks/Player.ts:23](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/codeblocks/Player.ts#L23)

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

### event

• **event**: `string`

#### Defined in

[codeblocks/Player.ts:23](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/codeblocks/Player.ts#L23)

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
