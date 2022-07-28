[sparkscript](../README.md) / [Exports](../modules.md) / [values/Variable](../modules/values_Variable.md) / default

# Class: default

[values/Variable](../modules/values_Variable.md).default

## Hierarchy

- [`default`](components_Value.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](values_Variable.default.md#constructor)

### Properties

- [data](values_Variable.default.md#data)
- [name](values_Variable.default.md#name)
- [scope](values_Variable.default.md#scope)
- [slot](values_Variable.default.md#slot)
- [type](values_Variable.default.md#type)

### Methods

- [export](values_Variable.default.md#export)
- [from](values_Variable.default.md#from)

## Constructors

### constructor

• **new default**(`name`, `scope?`, `slot?`)

Create a variable value.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | Name of the variable. |
| `scope` | ``"local"`` \| ``"game"`` \| ``"save"`` | `"game"` | - |
| `slot?` | `number` | `undefined` | - |

#### Overrides

[default](components_Value.default.md).[constructor](components_Value.default.md#constructor)

#### Defined in

[values/Variable.ts:16](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Variable.ts#L16)

## Properties

### data

• **data**: ``null`` \| [`default`](components_DataStorage.default.md) = `null`

#### Inherited from

[default](components_Value.default.md).[data](components_Value.default.md#data)

#### Defined in

[components/Value.ts:17](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L17)

___

### name

• **name**: `string`

#### Defined in

[values/Variable.ts:16](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Variable.ts#L16)

___

### scope

• **scope**: ``"local"`` \| ``"game"`` \| ``"save"`` = `"game"`

#### Defined in

[values/Variable.ts:16](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/values/Variable.ts#L16)

___

### slot

• `Optional` **slot**: `number`

#### Inherited from

[default](components_Value.default.md).[slot](components_Value.default.md#slot)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

___

### type

• **type**: `string`

#### Inherited from

[default](components_Value.default.md).[type](components_Value.default.md#type)

#### Defined in

[components/Value.ts:25](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L25)

## Methods

### export

▸ **export**(`containingBlockArguments`): [`serializedValue`](../interfaces/components_Value.serializedValue.md)

Export the value to a JSON object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `containingBlockArguments` | [`default`](components_Value.default.md)[] |

#### Returns

[`serializedValue`](../interfaces/components_Value.serializedValue.md)

DiamondFire JSON-ified value.

#### Inherited from

[default](components_Value.default.md).[export](components_Value.default.md#export)

#### Defined in

[components/Value.ts:34](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L34)

___

### from

▸ `Static` **from**(`raw`): [`default`](components_Value.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | [`serializedValue`](../interfaces/components_Value.serializedValue.md) |

#### Returns

[`default`](components_Value.default.md)

#### Inherited from

[default](components_Value.default.md).[from](components_Value.default.md#from)

#### Defined in

[components/Value.ts:11](https://github.com/UserUNP/sparkscript/blob/cae50c6/src/components/Value.ts#L11)
