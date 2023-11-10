import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SignIn, SignUp, UserDoc } from '../interface/auth.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firestoreService: AngularFirestore,
    private storageService: StorageService
  ) { }

  private checkAuthDto(dto: SignUp) {
    if (!dto.dni || !dto.firstName || !dto.lastName || !dto.password) {
      return false;
    }
    return true;
  }

  async saveCredentials(session: { dni: string, password: string }) {
    await this.storageService.set('dni', session.dni);
    await this.storageService.set('password', session.password);
  }

  async automaticSign() {
    const foundDni = await this.storageService.get('dni');
    const foundPassword = await this.storageService.get('password');
    return await this.authenticateUser({ dni: foundDni, password: foundPassword });
  }

  registerUser(dto: SignUp) {
    if (!this.checkAuthDto(dto)) return false;
    return this.firestoreService.collection('User').add(dto);
  }

  async authenticateUser(dto: SignIn) {
    const userCollection = this.firestoreService.collection('User').ref;
    let userDoc = (await userCollection.where('dni', '==', dto.dni).get()).docs[0];
    if (!userDoc) return false;
    const userPayload = userDoc.data() as UserDoc;
    if (dto.password !== userPayload.password) return false;
    await this.saveCredentials(userPayload);
    return true
  }
}