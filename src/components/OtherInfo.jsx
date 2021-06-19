import React                      from "react";
import { Notification, Title }    from "bloomer";
import { Trans, withTranslation } from "react-i18next";

class OtherInfo extends React.Component {
	render() {
		let otherInfo = null;

		if (this.props.other_info) {
			otherInfo =
				<Notification style={{marginTop: 20}} isColor='warning'>
					<Title isSize={4}><Trans i18nKey="other_info.other_info"/></Title>
					<p>{this.props.other_info}</p>
				</Notification>;
		}
		return otherInfo;
	}
}

export default withTranslation () (OtherInfo);
