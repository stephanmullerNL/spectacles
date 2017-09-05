import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userLink'
})
export class UserLinkPipe implements PipeTransform {

  transform(username: string): any {
    return `@<a href="https://steemit.com/@${username}" target="_blank" class="user-link">${username}</a>`;
  }
}
