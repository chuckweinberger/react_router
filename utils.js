
import { each, omit, find } from 'lodash';

export function findUserById(id, users){
  return find(users, { _id: id });
};

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}