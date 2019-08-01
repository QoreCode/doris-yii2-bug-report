import Vue from 'vue';
import Component from 'vue-class-component';
import * as clipboard from "clipboard-polyfill";
import NotificationConfig from "../../../../core/config/notification-config";
import {Issue} from '@/core/entities/issue/model';

@Component({
    props: {
        issue: Issue
    },
    filters: {
        capitalize: function (value: string) {
            if (!value || value.length < 50) {
                return value;
            }

            let characters = value.split('');
            characters = characters.splice(0, 100);
            characters.push('...');

            return characters.join('');
        }
    }
})
export default class CommentsListItemComponent extends Vue {
    public showDetail: boolean = false;

    toggleDetail() {
        this.showDetail = !this.showDetail;
    }

    copyId() {
        let id = this.$props.issue.id;
        clipboard.writeText(id.toString()).then(() => {
            this.$notify(NotificationConfig.getSuccessConfig(`Идентификатор ${id} скопирован`));
        });
    }

    scrolledTo() {
        window.scrollTo({
            top: this.$props.issue.meta.scrollY,
            left: this.$props.issue.meta.scrollX,
            behavior: 'smooth'
        })
    }

    isCurrentPage(href: string) {
        return href === window.location.href;
    }
}

