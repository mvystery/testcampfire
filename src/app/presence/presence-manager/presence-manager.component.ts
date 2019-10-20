import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../auth/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presence-manager',
  templateUrl: './presence-manager.component.html',
  styleUrls: ['./presence-manager.component.css']
})
export class PresenceManagerComponent implements OnInit {
  loading = true;

  id: number;
  groupName: string;
  robloxUsername: string;
  greeting: string;

  maxInactiveDaysEnabled: boolean;
  maxInactiveDaysYear: string;
  maxInactiveDays: number;

  clearWarnings: boolean;
  maxWarnings: number;

  tokensForPromotions: boolean;
  tokensAdjustbyAI: string;
  messageOnTokens: string;

  maxClaimableWeeklySessions: number;

  ctaEnabled: boolean;
  ctaMessage: string;

  settingsModifedBy: string;
  CtaModifiedBy: string;

  saveSettingsLoading: boolean;
  saveCTALoading: boolean;

  moderatorRole: number;
  staffRole: number;
  handbook: string;
  discordLink: string;

  searchLoading: boolean;
  ownerSection: boolean;

  loadingToken: boolean;
  ownerSettingsSaving: boolean;

  proFeaturesEnabling: boolean;

  premium: string;
  constructor(
    private service: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.service.getLoggedInUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
    });
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    const timeNow = new Date().getHours();
    if (timeNow < 12) {
      this.greeting = 'Good morning';
    }

    if (timeNow >= 12) {
      this.greeting = 'Good afternoon';
    }

    if (timeNow >= 17) {
      this.greeting = 'Good evening';
    }

    this.http
      .get<any>(`https://api.campfirebot.xyz/presence/checkmod/${this.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        if (data.allowed === false) {
          this.router.navigate(['/']);
          Swal.fire({
            title: 'Whoops!',
            type: 'error',
            text: 'Not authenticated properly'
          });
        } else {
          if (data.role === 255) {
            this.ownerSection = true;
          }
        }
      });

    this.http
      .get<any>(`https://api.campfirebot.xyz/presence/data/${this.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        this.loading = false;
        this.robloxUsername = data.presence.user.robloxUsername;
        this.groupName = data.presence.group.groupName;

        this.maxInactiveDaysEnabled = data.presence.group.maxInactiveEnabled;
        this.maxInactiveDaysYear = data.presence.group.maxInactiveTypeYear;
        this.maxInactiveDays = data.presence.group.maxInactiveDays;

        this.maxWarnings = data.presence.group.maxWarnings;
        this.clearWarnings = data.presence.group.clearWarnings;

        this.tokensForPromotions = data.presence.group.tokensForPromotions;
        this.tokensAdjustbyAI = data.presence.group.tokenAI;
        this.maxClaimableWeeklySessions = data.presence.group.maxWeeklySessions;
        this.messageOnTokens = data.presence.group.messageOnTokens;

        this.ctaEnabled = data.presence.group.ctaShowing;
        this.ctaMessage = data.presence.group.cta;

        this.moderatorRole = data.presence.group.moderatorRole;
        this.discordLink = data.presence.group.discordLink;
        this.staffRole = data.presence.group.staffRole;
        this.handbook = data.presence.group.handbook;

        this.CtaModifiedBy = data.presence.group.CTALastModifiedBy;
        this.settingsModifedBy = data.presence.group.settingsLastUpdatedBy;

        if (data.presence.group.premium !== 'undefined') {
          this.premium = new Date(
            data.presence.group.premium._seconds * 1000
          ).toLocaleDateString('en-GB');
        } else {
          this.premium = 'Never had Premium';
        }
      });
  }

  presenceSettingsSave(data) {
    this.saveSettingsLoading = true;

    this.http
      .post<any>(
        `https://api.campfirebot.xyz/presence/data/${this.id}/manage`,
        data.value,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        if (data.completed === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.settingsModifedBy = data.username;
          this.saveSettingsLoading = false;
        }
      });
  }

  ctaSettings(data) {
    this.saveCTALoading = true;

    this.http
      .post<any>(
        `https://api.campfirebot.xyz/presence/data/${this.id}/cta`,
        data.value,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        if (data.completed === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.CtaModifiedBy = data.username;
          this.saveCTALoading = false;
        }
      });
  }

  searchUser(data) {
    this.searchLoading = true;
    this.http
      .get<any>(
        `https://api.campfirebot.xyz/presence/search/${this.id}/${data.value.username}`,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      .subscribe(searchResults => {
        if (searchResults.success === true) {
          this.searchLoading = false;
          this.router.navigate([
            `/presence/${this.id}/manage/${data.value.username}`
          ]);
        } else {
          this.searchLoading = false;
          Swal.fire({
            title: 'Whoops!',
            // tslint:disable-next-line: quotemark
            text: searchResults.reason,
            type: 'error'
          });
        }
      });
  }

  ownerSettings(data) {
    this.ownerSettingsSaving = true;

    this.http
      .post<any>(
        `https://api.campfirebot.xyz/presence/data/${this.id}/owner`,
        data.value,
        {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        }
      )
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(data => {
        if (data.completed === true) {
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });

          this.ownerSettingsSaving = false;
        }
      });
  }

  revealToken() {
    this.loadingToken = true;
    this.http
      .get<any>(`https://api.campfirebot.xyz/presence/token/${this.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        if (data.success === true) {
          this.loadingToken = false;
          document.getElementById(
            'token'
          ).innerHTML = `<code>${data.token}</code>`;
        } else {
          this.loadingToken = false;
        }
      });
  }

  enablePro() {
    this.proFeaturesEnabling = true;
    this.http
      .get<any>(`https://api.campfirebot.xyz/presence/enablepro/${this.id}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      .subscribe(data => {
        if (data.success === true) {
          this.proFeaturesEnabling = false;
          Swal.fire({
            title: 'All done!',
            position: 'bottom-end',
            // tslint:disable-next-line: quotemark
            text: 'Your data was saved',
            type: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 5000
          });
        } else {
          this.proFeaturesEnabling = false;
        }
      });
  }
}
