import { Injectable } from '@angular/core';
import {account} from '../interfaces/account';
import { Observable} from "rxjs";
import {accountData} from '../mockData/data';

@Injectable()
export class AccountService {
	getData(){
		return Observable.of(accountData);
	}
}