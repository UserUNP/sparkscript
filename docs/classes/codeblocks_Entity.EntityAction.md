[sparkscript](../README.md) / [Exports](../modules.md) / [codeblocks/Entity](../modules/codeblocks_Entity.md) / EntityAction

# Class: EntityAction

[codeblocks/Entity](../modules/codeblocks_Entity.md).EntityAction

## Hierarchy

- [`default`](components_Block.default.md)

  ↳ **`EntityAction`**

## Table of contents

### Constructors

- [constructor](codeblocks_Entity.EntityAction.md#constructor)

### Properties

- [action](codeblocks_Entity.EntityAction.md#action)
- [args](codeblocks_Entity.EntityAction.md#args)
- [type](codeblocks_Entity.EntityAction.md#type)

### Methods

- [export](codeblocks_Entity.EntityAction.md#export)
- [from](codeblocks_Entity.EntityAction.md#from)

## Constructors

### constructor

• **new EntityAction**(`action`, ...`args`)

Used to do something related to an entity or multiple entities.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | `string` | Action to perform. |
| `...args` | [`default`](components_Value.default.md)[] | Arguments to pass. |

#### Overrides

[default](components_Block.default.md).[constructor](components_Block.default.md#constructor)

#### Defined in

codeblocks/Entity.ts:11

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
