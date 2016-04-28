
import { each, omit, find } from 'lodash';

export function findUserById(id, users){
  return find(users, { _id: id });
};

