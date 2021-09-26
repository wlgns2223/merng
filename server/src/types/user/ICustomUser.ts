import { BeAnObject, IObjectWithTypegooseFunction } from "@typegoose/typegoose/lib/types";
import { Document } from "mongoose";
import {User} from "../../model/User";

export interface ICustomUser extends User, Document<any,BeAnObject,any>, IObjectWithTypegooseFunction{
    _doc?: any
}