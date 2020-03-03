import React, { useMemo } from 'react';

import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import { ProfileCardSection } from '../../../../commons/profile_card/profile_card_section/profile_card_section';
import { ProfileCardSectionTitle } from '../../../../commons/profile_card/profile_card_section_title/profile_card_section_title';
import { ProfileCardSectionText } from '../../../../commons/profile_card/profile_card_section_text/profile_card_section_text';
import { ProfileCardAnimatedBack } from '../../../../commons/profile_card/profile_card_animated_back/profile_card_animated_back';
import { ProfileCardSectionSubtitle } from '../../../../commons/profile_card/profile_card_section_subtitle/profile_card_section_subtitle';

import { styles } from './experiences_back_styles';
import { translations } from './experiences_translations';

const useStyles = createUseStyles(styles);

const ExperienceContent = ({ experience, variant, classes }) => {
    const { formatMessage } = useIntl();
    const { id, name, summary, place } = experience;
    const dateString = useMemo(() => {
        if (!experience.endDate) {
            return formatMessage(translations.since, { year: experience.startDate?.year() || '' });
        }
        return `${experience.startDate?.year() || ''} - ${experience.endDate.year()}`;
    }, [experience]);

    const title = useMemo(() => {
        const builder = [];
        if (name) {
            builder.push(name);
        }
        if (place?.name) {
            builder.push(place.name);
        }
        return builder.join(' - ');
    }, [experience]);
    return (
        <ProfileCardSection key={id} cardVariant={variant}>
            <ProfileCardSectionTitle>{dateString}</ProfileCardSectionTitle>
            <ProfileCardSectionSubtitle customClasses={{ container: classes.subtitle }}>
                {title}
            </ProfileCardSectionSubtitle>
            <ProfileCardSectionText>{summary}</ProfileCardSectionText>
        </ProfileCardSection>
    );
};

const ExperiencesBackComponent = ({ data }) => {
    const classes = useStyles();
    const experiences = data.work?.filter(({ name, summary }) => Boolean(name && summary));
    return (
        <ProfileCardAnimatedBack title="Experiences">
            {experiences.map(experience => (
                <ExperienceContent key={`work_experience_${experience.id}`} experience={experience} classes={classes}/>
            ))}
        </ProfileCardAnimatedBack>
    );
};

export const ExperiencesBack = ExperiencesBackComponent;
