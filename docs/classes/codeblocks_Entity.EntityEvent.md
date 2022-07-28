[sparkscript](../README.md) / [Exports](../modules.md) / [codeblocks/Entity](../modules/codeblocks_Entity.md) / EntityEvent

# Class: EntityEvent

[codeblocks/Entity](../modules/codeblocks_Entity.md).EntityEvent

## Hierarchy

- [`default`](components_Block.default.md)

  ↳ **`EntityEvent`**

## Table of contents

### Constructors

- [constructor](codeblocks_Entity.EntityEvent.md#constructor)

### Properties

- [action](codeblocks_Entity.EntityEvent.md#action)
- [args](codeblocks_Entity.EntityEvent.md#args)
- [event](codeblocks_Entity.EntityEvent.md#event)
- [type](codeblocks_Entity.EntityEvent.md#type)

### Methods

- [export](codeblocks_Entity.EntityEvent.md#export)
- [from](codeblocks_Entity.EntityEvent.md#from)

## Constructors

### constructor

• **new EntityEvent**(`event`)

When an entity does something.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | Event to listen for. |

#### Overrides

[default](components_Block.default.md).[constructor](components_Block.default.md#constructor)

#### Defined in

codeblocks/Entity.ts:23

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

codeblocks/Entity.ts:23

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
