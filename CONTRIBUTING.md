Follow specified rules in `.editorconfig`, or use an extension to automatically apply them.  
Don't type a new line for a curly bracket. Don't put semicolons on curly brackets.  
Long generic type parameter lists & class extend clauses can be on a new line to be readable. 
  
  
# Adding files
When adding files to a folder such as `codeblocks` or `core/types` for example, check for an `index.ts` file that might
contain export some stuff to be usable by the user when importing the sparkscript package.
  
# Adding values/codeblocks
For creating new values/codeblocks, you have you append it's type into the respective file in the `types` folder..  
Files that are prefixed with "`DF`" or "`MC`" are all located in the `core/types/` folder.  
## Values:
**Firstly** go to `DFValueCodename` and `DFValueType` and append the value's codename and class type there.  
Registering new values is a bit complicated but makes sense.
 1. In `DFValueDataType` add the type of value's data structure,  
    for example: DiamondFire's text value has the type of `{ name: string }` as it's data structure.
 2. You can finally go to the `mapperUtils` file found at the `common` folder, find the `valueMap` object and add your own constructor there based on the input,  
    the type of the input is `RawDFValueDataRecord<T>` where you replace `T` with the value's type of data structure that added to `DFValueDataType` at step 1.
 3. You can take example from the already made values if you didn't understand (i don't blame you).
  
  
## Codeblocks:
**You must** select a block with an ID of `block` because the `bracket` block is already implemented..
 1. Put the block's codename in `DFBlockCodename`.
 2. Identify the type of the block,  
    if it has a `data` property then it is a `DataBlock`,  
    if it has `subAction` and `action` properties then it is a `SubActionBlock`,  
    otherwise it's an `ActionBlock` or a `ConditionalBlock`.  
    All of `DataBlock`, `ActionBlock`, `SubActionBlock` & `ConditionalBlock` can be found at `core/components/`.
 3. Implement the codeblock using the appropriate block type and codename with the respective type parameters.
 4. Go to the `mapperUtils` file found at the `common` folder, find the `blockMap` object and add your own constructor based on the input,  
    you can take examples from the already implemented and mapped blocks..
  
<br />
  
You can always open an issue for any problems you encounter or questions.
