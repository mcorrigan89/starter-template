import { GraphQLScalarType } from 'graphql';

function validate(file: unknown): File | never {
  return file as File;
}

export const CustomFileScalar = new GraphQLScalarType<File, File>({
  name: 'File',
  description: 'A simple file parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
});
