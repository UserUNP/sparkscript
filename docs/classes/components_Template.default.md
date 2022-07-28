[sparkscript](../README.md) / [Exports](../modules.md) / [components/Template](../modules/components_Template.md) / default

# Class: default

[components/Template](../modules/components_Template.md).default

## Table of contents

### Constructors

- [constructor](components_Template.default.md#constructor)

### Properties

- [\_blocks](components_Template.default.md#_blocks)
- [author](components_Template.default.md#author)
- [cuSocket](components_Template.default.md#cusocket)
- [name](components_Template.default.md#name)

### Accessors

- [blocks](components_Template.default.md#blocks)
- [first](components_Template.default.md#first)
- [last](components_Template.default.md#last)
- [length](components_Template.default.md#length)

### Methods

- [export](components_Template.default.md#export)
- [get](components_Template.default.md#get)
- [pop](components_Template.default.md#pop)
- [push](components_Template.default.md#push)

## Constructors

### constructor

• **new default**(`name?`, `author?`)

Create a new template.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | Template name, defaults to "untitled". |
| `author?` | `string` | Template author, defaults to "anonymous". |

#### Defined in

[components/Template.ts:23](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L23)

## Properties

### \_blocks

• **\_blocks**: [`default`](components_Block.default.md)[] = `[]`

Never use this unless you want to explicitly set the codeblocks array.

#### Defined in

[components/Template.ts:15](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L15)

___

### author

• `Optional` **author**: `string`

#### Defined in

[components/Template.ts:23](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L23)

___

### cuSocket

• `Optional` **cuSocket**: `WebSocket`

#### Defined in

[components/Template.ts:16](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L16)

___

### name

• `Optional` **name**: `string`

#### Defined in

[components/Template.ts:23](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L23)

## Accessors

### blocks

• `get` **blocks**(): [`default`](components_Block.default.md)[]

The codeblocks that make up this template.

#### Returns

[`default`](components_Block.default.md)[]

#### Defined in

[components/Template.ts:91](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L91)

___

### first

• `get` **first**(): [`default`](components_Block.default.md)

Get the first codeblock in the template.

#### Returns

[`default`](components_Block.default.md)

#### Defined in

[components/Template.ts:109](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L109)

___

### last

• `get` **last**(): [`default`](components_Block.default.md)

Get the last codeblock in the template.

#### Returns

[`default`](components_Block.default.md)

#### Defined in

[components/Template.ts:102](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L102)

___

### length

• `get` **length**(): `number`

#### Returns

`number`

#### Defined in

[components/Template.ts:95](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L95)

## Methods

### export

▸ **export**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `compressed` | `string` |
| `sendToCodeutils` | `Function` |
| `serialized` | [`serializedTemplate`](../interfaces/components_Template.serializedTemplate.md) |

#### Defined in

[components/Template.ts:28](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L28)

___

### get

▸ **get**(`index?`): [`default`](components_Block.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `index?` | `number` |

#### Returns

[`default`](components_Block.default.md)

#### Defined in

[components/Template.ts:83](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L83)

___

### pop

▸ **pop**(`index?`): `void`

Remove from.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index?` | `number` | Index of the codeblock to remove. |

#### Returns

`void`

#### Defined in

[components/Template.ts:78](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L78)

___

### push

▸ **push**(...`blocks`): `void`

Add to.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...blocks` | [`default`](components_Block.default.md)[] | Codeblock(s) to add to the template. |

#### Returns

`void`

#### Defined in

[components/Template.ts:70](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Template.ts#L70)
