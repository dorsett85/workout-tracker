import { SampleComponent } from './components/SampleComponent';
import styles from 'assets/css/app.scss';

/**
 * Add app initializing functionality here
 */
document.body.onload = () => {
  document.getElementById('app').insertAdjacentHTML('afterbegin', `
    <div class="${styles.appContainer}">
      <div>
        ${SampleComponent}
      </div>
    </div>
  `);
};
